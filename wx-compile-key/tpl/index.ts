/**
 * Created by allen on 2016/10/12 0012.
 */
import * as fs from 'fs';
import * as path from 'path';
const replaceIndicator = "{{port}}";

export default function getExpressTpl(port: number): string {
    const templatePath = path.join(__dirname, './express.tpl');
    const content = fs.readFileSync(templatePath).toString();
    return content.replace(replaceIndicator, port.toString());
}