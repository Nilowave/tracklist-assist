const Pixel = require('../models/pixel-model');

const create = (hash) => Pixel.create({ hash });

const get = (hash) => Pixel.findOne({ hash }).exec();

const remove = (hash) => Pixel.findOneAndDelete({ hash }).exec();

module.exports = {
  create,
  get,
  remove,
};
