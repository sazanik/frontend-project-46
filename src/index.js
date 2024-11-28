import path from "path";

import { program } from "commander";

import { genObjectsDiff, genPlainDiff, parseFile } from "./utils/index.js";

const app = () => {
  program
    .name("genDiff")
    .description("Compares two configuration files and shows a difference.")
    .version("1.0.0")
    .helpOption("-h, --help", "output usage information")
    .option("-f, --format [type]", "output format", "stylish")
    .arguments("<filepath1> <filepath2>")
    .action((filepath1, filepath2) => {
      const absolutePath1 = path.resolve(process.cwd(), filepath1);
      const absolutePath2 = path.resolve(process.cwd(), filepath2);

      const obj1 = parseFile(absolutePath1);
      const obj2 = parseFile(absolutePath2);
      const options = program.opts();

      switch (options.format) {
        case "stylish":
          console.log(genObjectsDiff(obj1, obj2));
          break;
        case "plain":
          console.log(genPlainDiff(obj1, obj2));
          break;
        default:
          console.log(genObjectsDiff(obj1, obj2));
      }
    });

  program.parse(process.argv);
};

export default app;
