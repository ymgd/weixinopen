
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
			timestampe = timestampe||0
			resolve((timestampe < this.timestampe && !!this.data)?this.data:null)
		})
	}
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

const getEntityData = name => {
	const entity = entities.find(e=>e.name == name)
	return entity?entity.data:null
}

module.exports = {
	trace,
	initEntity,
	setEntity,
	getEntity,
	getEntityData
}