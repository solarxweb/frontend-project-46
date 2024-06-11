import stylishView from './stylish.js';
import plainView from './plain.js';
import jsonView from './json.js';

const outputFormat = {
  plain: plainView,
  stylish: stylishView,
  json: jsonView,
};

export default (data, format) => outputFormat[format](data);
