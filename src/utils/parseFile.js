import fs from 'fs';
import path from 'path';

export default (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const extension = path.extname(filePath);

  switch (extension) {
    case '.json':
      return JSON.parse(fileContent);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};
