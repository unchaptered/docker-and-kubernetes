import fs from 'fs';

import { convertMarkdownFile } from './markdown.converter';
import { getFolderList } from './folder.explorer';

const topFolderList = getFolderList('/');
const secTopFolderList = topFolderList.map(topFolder => getFolderList(topFolder));

const folderMap = new Map();
for (let idx = 0; idx < topFolderList.length; idx++)
    folderMap.set(topFolderList[idx], secTopFolderList[idx]);

const markdown = convertMarkdownFile(folderMap);
fs.writeFileSync('./README.md', markdown, { encoding: 'utf8' });
