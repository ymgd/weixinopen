var marked = require('./marked.min.js');

// // markdown parser
marked.setOptions({
	// renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
})
// 
// function marked(str){return str}

var cutStr = function(str, length){
	if(!str) return '';
	return str.substr(0, length);
}

var summary = function(markPlain, length){
	return marked(cutStr.apply(undefined, arguments));
}

module.exports = {
	marked: marked,
	cutStr: cutStr,
	summary: summary
}