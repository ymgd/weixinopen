import {WX_ROOT_PATH, RELATIVE_SHORTCUT_PATH} from './constants';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Created by allen on 2016/10/12 0012.
 */


interface IPort {
    min: number;
    max: number
}

const portastic = require('portastic');
const packageConfig = require('../package.json');

const port: IPort = packageConfig.port;

const minPort = port.min;
const maxPort = port.max;

export default function findPort(): Promise<number> {
    const promise = portastic.find({
        min: minPort,
        max: maxPort
    });
    return promise.then((ports)=> {
        if (ports.length === 0) {
            return Promise.reject(`findPort.ts: ports from ${minPort} to ${maxPort} are all unavailable`);
        }
        return ports[0];
    });
}


const portRegexIndicator = /server\.listen\((\d+)\)/;
export function getPort(): number {
    const targetPath = path.resolve(WX_ROOT_PATH, RELATIVE_SHORTCUT_PATH);
    const fileContent: string = fs.readFileSync(targetPath).toString();
    const result = portRegexIndicator.exec(fileContent);
    if (result.length > 1) {
        return +result[1];
    }
    return void 0;
}