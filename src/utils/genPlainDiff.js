const genPlainDiff = (obj1, obj2) => {
  const result = [];

  // Logic to generate plain diff
  // Iterate over the keys in both objects and create the plain format output
  // Example:
  for (const key of Object.keys(obj1)) {
    if (!obj2.hasOwnProperty(key)) {
      result.push(`Property '${key}' was removed`);
    } else if (obj1[key] !== obj2[key]) {
      result.push(
        `Property '${key}' was updated. From '${obj1[key]}' to '${obj2[key]}'`,
      );
    }
  }

  for (const key of Object.keys(obj2)) {
    if (!obj1.hasOwnProperty(key)) {
      result.push(`Property '${key}' was added with value: '${obj2[key]}'`);
    }
  }

  return result.join("\n");
};

export default genPlainDiff;
