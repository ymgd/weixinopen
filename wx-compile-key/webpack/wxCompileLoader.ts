import triggerCompile from '../src/triggerCompile';

export const autoCompileWebpackLoader = (content: string)=> {
	this.cacheable && this.cacheable();
	triggerCompile();
	return content;
};