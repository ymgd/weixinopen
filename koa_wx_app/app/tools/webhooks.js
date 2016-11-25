/**
 * Created by lichun on 2016/11/22.
 */
const exec = require('child_process').exec;
export async function pullStaticCode(cb) {
    return new Promise(function (resolve, reject) {
        exec('GIT_DIR=/home/project/sampsonapp/.git git pull', function (err, stdout, stderr) {
            if(err){
                reject(err)
            }else {
                resolve(stdout)
            }
        })
    })

}