import triggerCompile from '../src/triggerCompile';
export const autoCompileGulpTask = (cb) => {
    triggerCompile();
    cb();
};