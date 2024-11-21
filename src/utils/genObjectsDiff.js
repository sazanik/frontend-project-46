import _ from 'lodash';

const INDENT = {
  DEFAULT: '    ',
  PLUS: '  + ',
  MINUS: '  - ',
};

const genObjectsDiff = (obj1, obj2, depth = 0) => {
  const sortedKeys = _.sortBy(_.union([..._.keys(obj1), ..._.keys(obj2)]));

  if (!sortedKeys.length) {
    return ``;
  }

  const indent = INDENT.DEFAULT.repeat(depth);

  const lines = sortedKeys.map((key) => {
    const hasKey1 = _.has(obj1, key);
    const hasKey2 = _.has(obj2, key);

    const value1 = _.get(obj1, key);
    const value2 = _.get(obj2, key);

    if (hasKey1 && hasKey2) {
      if (_.isObject(value1) && _.isObject(value2)) {
        return `${indent}${INDENT.DEFAULT}${key}: ${genObjectsDiff(value1, value2, depth + 1)}`;
      }
    }

    if (!hasKey1) {
      if (_.isObject(value2)) {
        return `${indent}${obj1 ? INDENT.PLUS : INDENT.DEFAULT}${key}: ${genObjectsDiff(undefined, value2, depth + 1)}`;
      }

      return `${indent}${obj1 ? INDENT.PLUS : INDENT.DEFAULT}${key}: ${value2}`;
    }

    if (!hasKey2) {
      if (_.isObject(value1)) {
        return `${indent}${INDENT.MINUS}${key}: ${genObjectsDiff(undefined, value1, depth + 1)}`;
      }

      return `${indent}${INDENT.MINUS}${key}: ${value1}`;
    }

    if (!_.isEqual(value1, value2)) {
      if (_.isObject(value1)) {
        return `${indent}${INDENT.MINUS}${key}: ${genObjectsDiff(undefined, value1,
          depth + 1)}\n${indent}${INDENT.PLUS}${key}: ${value2}`;
      }

      return `${indent}${INDENT.MINUS}${key}: ${value1}\n${indent}${INDENT.PLUS}${key}: ${value2}`;
    }

    return `${indent}${INDENT.DEFAULT}${key}: ${value2}`;

  });

  return `{\n${lines.join('\n')}\n${indent}}`;
};

export default genObjectsDiff;
