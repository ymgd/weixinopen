import {WX_ROOT_PATH, RELATIVE_SHORTCUT_PATH} from './constants';
import {isFileExistsSync, updateWxRootPath} from './io-utils';
import * as path from 'path';
const inquirer = require('inquirer');

const questions = [
	{
		type: 'input',
		name: 'wxPath',
		message: '请输入微信web开发工具根目录',
		default: function () {
			return WX_ROOT_PATH;
		},
		validate: function (rootPath: string): boolean|string {
			const isFileExists = isFileExistsSync(path.resolve(rootPath, RELATIVE_SHORTCUT_PATH));
			if (isFileExists) {
				updateWxRootPath(rootPath);
				return true;
			}
			return '路径不存在，请输入一个合法的路径: ';
		}
	},
];

export function cmdPrompt(): Promise<string> {
	return inquirer.prompt(questions).then((msg: {wxPath: string})=> {
		return path.resolve(msg.wxPath, RELATIVE_SHORTCUT_PATH);
	});
}