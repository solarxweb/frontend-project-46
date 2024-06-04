import _ from 'lodash';

const getDiff = (data1, data2, el) => {
  let diff = {};
  if (_.isObject(data1[el]) && _.isObject(data2[el])) {
    diff = { state: 'nested', value: createTree(data1[el], data2[el]) };
  } else if (data1[el] === data2[el]) {
    diff = { state: 'unchanged', value:data1[el] };
  } else if (!_.has(data1, el)) {
    diff = { state: 'added', value: data2[el] };
  } else if (!_.has(data2, el)) {
    diff = { state: 'deleted', value: data1[el] };
  } else if (data1[el] && data2[el] && data1[el] !== data2[el]) {
    diff = { state: 'changed', oldValue: data1[el], newValue: data2[el] };
  }
  return diff;
};

const createTree = (data1, data2) => {
  const commonKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const compare = commonKeys.reduce((acc, el) => {
    acc[el] = getDiff(data1, data2, el);
    return acc;
  }, {});
  return compare;
};

export default createTree;