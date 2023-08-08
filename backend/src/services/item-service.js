const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const Item = require('../models/item-model');
const Tracks = require('../models/track-model');

const create = (data) => Item.create(data);

const update = (id, data) =>
  Item.findOne({ _id: id })
    .exec()
    .then((itemData) => {
      const item = itemData;
      item.set(data);

      return item.save();
    });

const remove = (id) => Item.findOneAndDelete({ _id: id }).exec();

const get = (id) => Item.findOne({ _id: id }).exec();

const all = (user) =>
  new Promise((resolve, reject) => {
    /**
     * Aggregate Track fields for logged in user and count
     * tracked dates, grouped by Item id & return the last date
     *  */
    Tracks.aggregate([
      { $match: { user: new ObjectId(user) } },
      { $group: { _id: '$item', count: { $sum: 1 }, last: { $max: '$date' } } },
    ])
      .exec()
      .then((aggregate) => {
        Item.find({ user, archived: { $in: [null, false] } })
          .exec()
          .then((items) => {
            const itemsData = items.map((item) => {
              const values = aggregate.find((obj) => obj._id.valueOf() === item.id);
              const retunrValues = {
                ...item._doc,
                id: item.id,
                count: values?.count,
                last: values?.last,
              };
              delete retunrValues._id;
              // eslint-disable-next-line no-underscore-dangle
              delete retunrValues.__v;

              return retunrValues;
            });

            resolve(itemsData);
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });

module.exports = {
  create,
  update,
  remove,
  get,
  all,
};
