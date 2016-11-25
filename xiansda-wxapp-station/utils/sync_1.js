
const Promise = require("bluebird.min")
const EventEmitter = require("events").EventEmitter;

function SyncEntity(name, loader){
	this.name = name
	this.loader = loader
	this.events = []
}
SyncEntity.prototype = Object.create(EventEmitter.prototype);
SyncEntity.prototype.set = function(data, expire){
	this.data = data
	this.expire = expire
	this.timestampe = (new Date()).getTime()
	this.emit('update', data)
	return this
}
SyncEntity.prototype.get = function(timestampe){
	if(!!this.expire && ((new Date()).getTime() - this.timestampe > this.expire*1000)){
		this.data = this.expire = null
		this.timestampe = (new Date()).getTime()
	}

	if(!this.data && !!this.loader){
		return this.loader().then(data=>{
			this.set(data)
			return data
		})
	}else{
		return new Promise((resolve, reject)=>{
			resolve((timestampe < this.timestampe && !!this.data)?this.data:null)
		})
	}
}
SyncEntity.prototype.getter = function(){
	return new SyncGetter(this)
}


const entities = []
const trace = () => {
	console.log(entities)
}
const initEntity = (name, loader, expire=null) => {
	let entity = entities.find(e=>e.name == name)

	if(!entity){
		entity = new SyncEntity(name, loader, expire)
		entities.push(entity)
	}

	return entity
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
const getEntity = name => {
	return entities.find(e=>e.name == name)
}


/******************* 
 	sync getter
********************/
function SyncGetter(entity){
	this.entity = entity
	this.timestampe = 0
	this.events = []
}
SyncGetter.prototype.get = function(opts){
	opts = Object.assign({force:false}, opts)

	const timestampe = (opts.force===true)?0:this.timestampe
	return new Promise((resolve, reject)=>{
		this.entity.get(timestampe).then(data=>{
			if(!!data){
				this.timestampe = (new Date()).getTime()
				resolve(data)
			}
		})
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

const getter = (name, loader=null) => {
	const entity = entities.find(e=>e.name == name)||(!!loader)?initEntity(name, loader):setEntity(name,null)
	return new SyncGetter(entity)
}

const getEntityData = name => {
	const entity = entities.find(e=>e.name == name)
	return entity?entity.data:null
}

module.exports = {
	trace,
	initEntity,
	setEntity,
	getEntity,
	getEntityData,
	getter
}