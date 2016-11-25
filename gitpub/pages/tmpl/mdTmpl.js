// class MdTmpl {
// 	constructor(opts) {

// 		if(opts.name == "") return;
// 		this.node = {};
		
// 		this.node.name = opts.name || "";
// 		this.node.content = opts.content || "";
// 		// return this.node
// 		this.createElement();
// 	}

// 	createElement() {
// 		return this.node;
// 	}
// }

var MdTmpl = function(opts) {
	if(opts.name == "") return;
	var node = {};

	var createElement = function(name) {
		node.name = name || "";
	}

	var content = function(content) {
		node.content = content || "";
	}
}


// function mdTmpl(argument) {
	
// }

// function createElement(node) {

// }

module.exports = {
  MdTmpl:MdTmpl
}