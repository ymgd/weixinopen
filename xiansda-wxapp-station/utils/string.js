
function StringArray(str){
	this.arr = (!!str && str.length>0)?str.split(','):[]
}

StringArray.prototype.add = function(item){
	this.arr.push(item)
}

StringArray.prototype.remove = function(item){
	const idx = this.arr.findIndex(i=>i==item)
	if(idx>=0) 
		this.arr.splice(idx, 1)
	return idx
}

StringArray.prototype.array = function(){
	return this.arr
}

StringArray.prototype.toString = function(){
	return this.arr.join(',')
}

StringArray.prototype.count = function(){
	return this.arr.length
}

module.exports = {
	StringArray
}
