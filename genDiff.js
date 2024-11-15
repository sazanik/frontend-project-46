import { program } from 'commander';

const app = () => {
  program
    .name('genDiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>');

  program.parse(process.argv);

  const options = program.opts();
  console.log(options);
  console.log(process.argv);
};

export default app;
