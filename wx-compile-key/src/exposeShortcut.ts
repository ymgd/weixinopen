import * as fs from 'fs';

function isAppendScriptExists(content: string, appendScriptStr: string) {
    return content.indexOf(appendScriptStr) > -1;
}

function hasAppendedPromise(shortcutPath: string, appendScriptStr: string): Promise<boolean> {
    return new Promise((resolve, reject)=> {
        fs.readFile(shortcutPath, (err: NodeJS.ErrnoException, data: Buffer)=> {
            if (err) {
                reject(err);
                return;
            }
            const content = data.toString();
            resolve(isAppendScriptExists(content, appendScriptStr));
        })
    });
}

function appendScript(shortcutPath: string, appendScriptStr: string): Promise<boolean> {
    return new Promise((resolve, reject)=> {
        fs.appendFile(shortcutPath, appendScriptStr, (err: NodeJS.ErrnoException)=> {
            !err ? resolve(true) : reject(err);
        })
    });
}

export function exposeCompileShortcut(shortcutPath: string, appendScriptStr: string): Promise<boolean> {
    return hasAppendedPromise(shortcutPath, appendScriptStr)
        .then((hasAppended: boolean): Promise<boolean>=> {
            if (!hasAppended) {
                return appendScript(shortcutPath, appendScriptStr)
            }
            return Promise.reject(new Error(`script has already appended.`)) as Promise<any>
        })
}