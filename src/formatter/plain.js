const checkValueType = (value) => {
  switch (true) {
    case typeof value === 'string':
      return `'${value}'`;
    case value === null:
      return null;
    case typeof value === 'object':
      return '[complex value]';
    default:
      return value;
  }
};

const plainView = (data) => {
  const iter = (nodes, path) => {
    const result = nodes
      .filter((node) => node.state !== 'unchanged')
      .flatMap((node) => {
        const {
          key, children, value, oldValue, newValue, state,
        } = node;
        const makePathToKey = path === '' ? `${key}` : `${path}.${key}`;
        switch (state) {
          case 'nested':
            return iter(children, makePathToKey);
          case 'deleted':
            return `Property '${makePathToKey}' was removed`;
          case 'added':
            return `Property '${makePathToKey}' was added with value: ${checkValueType(value)}`;
          case 'changed':
            return `Property '${makePathToKey}' was updated. From ${checkValueType(oldValue)} to ${checkValueType(newValue)}`;
          default:
            throw new Error(`Unknown type ${state}.`);
        }
      });
    return result.join('\n');
  };
  return iter(data, '');
};

export default plainView;
