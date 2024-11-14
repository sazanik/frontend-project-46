import { program } from 'commander';

const app = () => {
  program
    .name('genDiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .helpOption('-h, --help', 'output usage information');

  program.parse();
};

export default app;
