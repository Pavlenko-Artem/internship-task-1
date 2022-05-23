import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let textFromFiles = "";

const concatAllTextFilesFromDir = (pathToDir = "") => {
  try {
    const files = fs.readdirSync(path.resolve(pathToDir), { withFileTypes: true });
    for (const file of files) {
      const fileStat = fs.statSync(path.resolve(pathToDir, file.name));
      if (fileStat && fileStat.isDirectory()) {
        concatAllTextFilesFromDir(path.resolve(pathToDir, file.name));
      } else if (path.extname(file.name) === '.txt') {
        const textFile = fs.readFileSync(path.resolve(pathToDir, file.name), { encoding: 'utf-8', flag: 'r' });
        textFromFiles += textFile;
      }
    }
  } catch (err) {
    console.error(err);
  }
  return textFromFiles;
}