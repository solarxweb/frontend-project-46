import _ from 'lodash';

const stringify = (value, depth) => {
  if (_.isPlainObject(value)) {
    const indent = ' '.repeat(4 * (depth + 1));
    const closingIndent = ' '.repeat(4 * depth);
    const entries = Object.entries(value).map(([key, val]) => {
      const formattedValue = _.isPlainObject(val) ? stringify(val, depth + 1) : val;
      return `${indent}${key}: ${formattedValue}`;
    }).join('\n');
    return `{\n${entries}\n${closingIndent}}`;
  }
  return `${value}`;
}

const stylishView = (list) => {
  function innerFunc(listOfDifference, depth) {
    const space = ' '.repeat(4 * depth);
    const result = listOfDifference.map((element) => {
      const shortIndent = space.slice(0, -2);
      switch (element.state) {
        case 'nested':
          return `${space}${element.key}: {\n${innerFunc(element.value, depth + 1)}\n${space}}`;
        case 'added':
          return `${shortIndent}+ ${element.key}: ${stringify(element.value, depth)}`;
        case 'unchanged':
          return `${shortIndent}  ${element.key}: ${stringify(element.value, depth)}`;
        case 'deleted':
          return `${shortIndent}- ${element.key}: ${stringify(element.value, depth)}`;
        case 'changed':
          return `${shortIndent}- ${element.key}: ${stringify(element['oldValue'], depth)}\n${shortIndent}+ ${element.key}: ${stringify(element['newValue'], depth)}`;
        default:
          throw new Error(`Unexpected state of ${element.state}`);
      }
    });
    return result.join('\n');
  }
  const result = innerFunc(list, 1);
  return `{\n${result}\n}`;
}

export default stylishView;