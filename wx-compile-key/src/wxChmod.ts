const chmod = require('chmod');
const permissionMode = 777;
export default function wxChmod(path:string) {
    return new Promise((resolve, reject)=> {
        try {
            chmod(path, permissionMode);
            resolve(true);
        } catch (err) {
            reject(err)
        }
    });
}