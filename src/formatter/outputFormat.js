import stylishView from "./stylish.js"

const outputFormat = {
  stylish: stylishView,
  json: JSON.stringify,
};

export default (data, format) => outputFormat[format](data);