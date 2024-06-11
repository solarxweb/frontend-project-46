import _ from 'lodash';

const addIndent = (depth, replacer = ' ', spaceCount = 4) => replacer.repeat((depth * spaceCount) - 2);
const addIndentForBracket = (depth, replacer = ' ', spaceCount = 4) => replacer.repeat((depth * spaceCount) - spaceCount);

const stringify = (data, depth = 1) => {
  const iter = (currentData, currentDepth) => {
    if (!_.isObject(currentData)) {
      return `${currentData}`;
    }
    const currentIndent = addIndent(currentDepth);
    const bracketIndent = addIndentForBracket(currentDepth);
    const currentEl = Object.entries(currentData);

    const elements = currentEl.map(([key, value]) => `${currentIndent}  ${key}: ${iter(value, currentDepth + 1)}`);
    return ['{', ...elements, `${bracketIndent}}`].join('\n');
  };

  return iter(data, depth);
};

const stylishView = (list) => {
  const iter = (currentEl, depth) => {
    const currentIndent = addIndent(depth);
    const bracketIndent = addIndentForBracket(depth);
    const elements = currentEl.flatMap((node) => {
      const {
        state, key, children, value, oldValue, newValue,
      } = node;
      switch (state) {
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
        case 'deleted':
          return `${currentIndent}- ${key}: ${stringify(value, depth + 1)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return [
            `${currentIndent}- ${key}: ${stringify(oldValue, depth + 1)}`,
            `${currentIndent}+ ${key}: ${stringify(newValue, depth + 1)}`,
          ];
        default:
          throw new Error(`Unknown state: ${state}.`);
      }
    });
    return ['{', ...elements, `${bracketIndent}}`].join('\n');
  };
  return iter(list, 1);
};

export default stylishView;
