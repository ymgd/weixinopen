var EventEmitter = require("events").EventEmitter;

function SyncEntity(name){
	this.name = name
}
SyncEntity.prototype = Object.create(EventEmitter.prototype);
SyncEntity.prototype.set = function(data, expire){
	this.data = data
	this.expire = expire
	this.timestampe = (new Date()).getTime()
	this.emit('update', data)
}
SyncEntity.prototype.get = function(timestampe){
	if(!!this.expire && ((new Date()).getTime() - this.timestampe > this.expire*1000)){
		this.data = this.expire = null
		this.timestampe = (new Date()).getTime()
	}

	return (timestampe < this.timestampe && !!this.data)?this.data:null
}

function SyncGetter(entity){
	this.entity = entity
	this.timestampe = 0
	this.events = []
}
SyncGetter.prototype.get = function(opts){
	opts = Object.assign({force:false}, opts)

	const timestampe = (opts.force===true)?0:this.timestampe
	const that = this
	return new Promise((resolve, reject)=>{
		const data = that.entity.get(timestampe)
		if(!!data){
			that.timestampe = (new Date()).getTime()
			resolve(data)
		}
	})
}
SyncGetter.prototype.reset = function(){
	this.timestampe = 0
	return this
}
SyncGetter.prototype.bind = function(name, cb){
	this.events[name] = cb
	this.entity.on(name, cb)
	return this
}
SyncGetter.prototype.onUpdate = function(cb){
	this.bind('update', data=>{
		this.timestampe = (new Date()).getTime()
		cb(data)
	})
	return this
}
SyncGetter.prototype.checkUpdate = function(){
	const cb = this.events['update']
	if(!!cb) 
		this.get().then(data=>cb(data))

	return this
}

const entities = []
const trace = () => {
	console.log(entities)
}
const setEntity = (name, data, expire=null) => {
	let entity = entities.find(e=>e.name==name)
	if(!entity){
		entity = new SyncEntity(name)
		entities.push(entity)
	}

	if(!!data)
		entity.set(data, expire)
	return entity
}
const initEntity = (name, loader, expire=null) => {
	return new Promise((resolve, reject)=>{
		const entity = getSync(name)
		if(!!entity)
			resolve(entity) 
		else{
			return loader().then(data=>{
				resolve(setEntity(name, data, expire)) 
			})
		}
	})
}
const getter = (name, loader=null) => {
	const entity = entities.find(e=>e.name == name)||(!!loader)?initEntity(name, loader):setEntity(name,null)
	return new SyncGetter(entity)
}
const getSync = name => {
	const entity = entities.find(e=>e.name == name)
	return entity?entity.data:null
}

module.exports = {
	trace,
	setEntity,
	initEntity,
	getter,
	getSync
}