import _ from 'lodash';

const createTree = (data1, data2) => {
  const commonKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const compare = commonKeys.reduce((acc, el) => {
    if (_.isObject(data1[el]) && _.isObject(data2[el])) return {...acc, [el]: createTree(data1[el], data2[el]), state: 'nested'};
    if (data1[el] === data2[el]) return {...acc, [el]:data1[el], state: 'unchanged'};
    if (!_.has(data1, el)) return {...acc, [el]:data2[el], state: 'added'};
    if (!_.has(data2, el)) return {...acc, [el]:data1[el], state: 'deleted'};
    if (data1[el] && data2[el]) {
      if (data1[el] !== data2[el]) return {...acc, [el]: { oldValue: data1[el], newValue: data2[el] }, state: 'changed'};
    }
  }, {})
  return JSON.stringify(compare);
};

export default createTree;