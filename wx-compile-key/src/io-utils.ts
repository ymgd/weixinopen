import * as fs from 'fs';
import {WX_ROOT_PATH} from './constants';
import * as path from 'path';
export function isFileExistsSync(path: string) {
	return fs.existsSync(path)
}

function replaceFromFile(filePath: string, searchValue: string, replaceValue: string) {
	const content = fs.readFileSync(filePath).toString();
	const newContent = content.replace(searchValue, replaceValue);
	fs.writeFileSync(filePath, newContent);
}

export function updateWxRootPath(value: string) {
	const packageConfigPath = path.resolve(__dirname, '../package.json');
	replaceFromFile(packageConfigPath, WX_ROOT_PATH, value)
}