import _ from 'lodash';

export default (obj1, obj2) => {
  // Getting all the keys from both objects and sort them
  const sortedKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  if (!sortedKeys.length) {
    return ``;
  }

  // Forming difference lines
  const diffs = sortedKeys.map((key) => {
    // Checking for the presence of keys in both objects
    const hasKey1 = _.has(obj1, key);
    const hasKey2 = _.has(obj2, key);

    // Values for comparison
    const value1 = obj1[key];
    const value2 = obj2[key];

    // Determining the type of difference
    if (!hasKey2) {
      return `  - ${key}: ${value1}`;
    }

    if (!hasKey1) {
      return `  + ${key}: ${value2}`;
    }

    if (!_.isEqual(value1, value2)) {
      return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
    }

    return `    ${key}: ${value1}`;
  });

  // Collecting the final line
  return `{\n${diffs.join('\n')}\n}`;
};
