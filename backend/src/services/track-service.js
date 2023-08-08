const mongoose = require('mongoose');
const Track = require('../models/track-model');

const { ObjectId } = mongoose.Types;
const create = (data) => Track.create(data);

const update = (id, data) =>
  Track.findOne({ _id: id })
    .exec()
    .then((trackData) => {
      const track = trackData;
      track.set(data);

      return track.save();
    });

const remove = (id) => Track.findOneAndDelete({ _id: id }).exec();

const get = (id) => Track.findOne({ _id: id }).exec();

const all = (user, item) =>
  new Promise((resolve, reject) => {
    Track.find({ user, item })
      .then((tracks) => resolve(tracks))
      .catch((error) => reject(error));
  });

const count = (user, item) =>
  item
    ? Track.count({ item, user }).exec()
    : Track.aggregate([
        { $match: { user: new ObjectId(user) } },
        { $group: { _id: '$item', count: { $sum: 1 }, last: { $max: '$date' } } },
      ]).exec();

module.exports = {
  create,
  update,
  remove,
  get,
  all,
  count,
};
