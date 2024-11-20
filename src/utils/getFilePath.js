import path from 'path';

import { __dirname } from '../../globals.js';

export default (folderPath, filename) => path.join(__dirname, folderPath ?? '', filename ?? '');
