import _ from 'lodash';

const prefix = {
  added: '+ ',
  unchanged: '  ',
  deleted: '- ',
};

const createTree = (data1, data2) => {
  const commonKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const compare = commonKeys.map((el) => {
    switch (true) {
      case _.isObject(data1[el]) && _.isObject(data2[el]):
        return { [el]:createTree(data1[el], data2[el]), state:'nested'};
      case data1[el] === data2[el]:
        return { [el]:data1[el], state: 'unchanged',};
      case !_.has(data1, el):
        return { [el]:data2[el], state: 'added'};
      case !_.has(data2, el):
        return { [el]:data1[el], state: 'deleted' };
      case data1[el] && data2[el] && data1[el] !== data2[el]:
        return { [el]: { oldValue: data1[el], newValue: data2[el]}, state: 'changed'};
      default:
        throw new Error('Unexpected situation')
    }
  });
  return compare;
};

export default createTree;