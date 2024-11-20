import path from 'path';

import { __dirname } from '../../globalVariables.js';

export default (relativeFolderPath, filename) => {
  if (typeof filename !== 'string') {
    throw new Error('filename must be a "string"');
  }

  if (typeof relativeFolderPath !== 'string') {
    throw new Error('folderPath must be a "string"');
  }

  return path.join(__dirname, relativeFolderPath, filename);
};
