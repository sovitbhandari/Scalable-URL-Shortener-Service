const { nanoid } = require('nanoid');

exports.generateId = async () => {
  return nanoid(8); // Generates an 8-character unique ID
};