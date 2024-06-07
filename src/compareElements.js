import _ from 'lodash';

const createTree = (data1, data2) => {
  const commonKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const compare = commonKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    switch (true) {
      case _.isObject(data1[key]) && _.isObject(data2[key]):
        return { key, children: createTree(value1, value2), state:'nested'};
      case data1[key] === data2[key]:
        return { key, value:value1, state: 'unchanged',};
      case !_.has(data1, key):
        return { key, value: value2, state: 'added'};
      case !_.has(data2, key):
        return { key, value: value1, state: 'deleted' };
      case data1[key] && data2[key] && data1[key] !== data2[key]:
        return { key, oldValue: value1, newValue: value2, state: 'changed'};
      default:
        throw new Error("Arguments aren't gotten or has strange structure")
    }
  });
  return compare;
};
export default createTree;