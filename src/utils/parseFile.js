import fs from 'fs';
import path from 'path';

import yaml from 'js-yaml';

export default (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const extension = path.extname(filePath);

  switch (extension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
      return yaml.load(fileContent);
    case '.yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};
