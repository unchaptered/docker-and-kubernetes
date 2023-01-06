import fs from 'fs';
import path from 'path';

const EXCEPT_SET = new Set([
    '.git',
    '.github',
    '.gitignore',
    '.DS_Store',
    'dist',
    'images',
    'node_modules',
    'package-lock.json',
    'package.json',
    'README.md',
    'src',
    'tsconfig.json'
]);

export function getFolderList(fileName: string): string[] {
    
    const temporalPath = path.join(__dirname, '/../', fileName);
    return fs.readdirSync(temporalPath).filter(v => !EXCEPT_SET.has(v));

}