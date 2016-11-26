import * as request from 'request';
import {getPort} from './findPort';

export default function triggerCompile() {
    const port = getPort();
    if (port) {
        try {
            request.get(`http://localhost:${port}`).on('error', (err: Error)=> {
                console.error(err);
            });
        } catch (err) {
            throw new Error("请打开微信web开发平台\r\n" + err.toString());
        }
    } else {
        throw new Error(`triggerCompile.ts: please append script before trigger compile`);
    }
}