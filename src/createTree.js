import _ from 'lodash';

const createTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const compared = keys.map((key) => {
    if (!_.has(data1, key)) return { key:key, value: data2[key], state: 'added'};
    if (!_.has(data2, key)) return { key:key, value: data1[key], state: 'removed'};
    if (data1[key] === data2[key]) return { key:key, value: data1[key], state: 'unchanged'};
    return { key:key, differentValues: { value1: data1[key], value2:data2[key] }};
  });
  const prefix = {
    added: '+ ',
    removed: '- ',
    unchanged: '  ',
  };
  const result = [];
  for (let item = 0; item < compared.length; item += 1) {
    const { key, value, state } = compared[item];
    if (compared[item].differentValues) {
      const x = compared[item].differentValues;
      result.push(`${prefix['removed']}${key}: ${x['value1']}`);
      result.push(`${prefix['added']}${key}: ${x['value2']}`);
    }
    if (compared[item].state) {
      result.push(`${prefix[state]}${key}: ${value}`);
    }
  }
  return result.join('\n');
};

export default createTree;