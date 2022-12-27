import fs from 'fs';
import path from 'path';

import { convertMarkdownFile } from './markdown.converter';

const temporalPath = path.join(__dirname, '/../');
const EXCEPT_SET = new Set([
    '.git',
    '.github',
    '.gitignore',
    'dist',
    'node_modules',
    'package-lock.json',
    'package.json',
    'README.md',
    'src',
    'tsconfig.json'
]);

const fileList = fs.readdirSync(temporalPath);
const fileteredFileList = fileList.filter(file => !EXCEPT_SET.has(file));
const markdown = convertMarkdownFile(fileteredFileList);

fs.writeFileSync('./README.md', markdown, { encoding: 'utf8' });
