import path from 'path';
import { program } from 'commander';

import { genDiff, parseFile } from './utils/index.js';

const app = () => {
  program
    .name('genDiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const absolutePath1 = path.resolve(process.cwd(), filepath1);
      const absolutePath2 = path.resolve(process.cwd(), filepath2);

      const obj1 = parseFile(absolutePath1);
      const obj2 = parseFile(absolutePath2);

      const diffs = genDiff(obj1, obj2);

      console.log(diffs);
    });

  program.parse(process.argv);

  // const options = program.opts();
  // console.log(options);
  // console.log(process.argv);
};

export default app;
