const {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
} = require('date-fns');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const TrackService = require('./track-service');
const Item = require('../models/item-model');
const Tracks = require('../models/track-model');
const parseMultipleDates = require('../utils/parseMultipleDates');

const archived = { $in: [null, false] };

const create = (data) => Item.create(data);

const update = (id, data) =>
  Item.findOne({ _id: id })
    .exec()
    .then((itemData) => {
      const item = itemData;
      item.set(data);

      return item.save();
    });

const unsetTracks = (id, data) =>
  Item.findOne({ _id: id })
    .exec()
    .then((itemData) => {
      const item = itemData;
      item.set('tracks', undefined, { strict: false });
      item.set(data);
      return item.save();
    });

const remove = (id) => Item.findOneAndDelete({ _id: id }).exec();

const get = (id) => Item.findOne({ _id: id, archived }).exec();

const all = (user, query) =>
  new Promise((resolve, reject) => {
    const props = { user, archived };

    if (query) {
      const nameSearchRegex = new RegExp(query, 'i');
      const parsedDate = parseMultipleDates(query);

      if (parsedDate) {
        if (parsedDate.getMonth() === 0) {
          props.$or = [
            {
              createdAt: {
                $gte: startOfYear(parsedDate),
                $lt: endOfYear(parsedDate),
              },
            },
            {
              createdAt: {
                $gte: startOfWeek(parsedDate),
                $lt: endOfWeek(parsedDate),
              },
            },
          ];
        } else {
          // If the parsed date is a month, search for items created within the parsed date range
          props.$or = [
            {
              createdAt: {
                $gte: startOfMonth(parsedDate),
                $lt: endOfMonth(parsedDate),
              },
            },
            {
              createdAt: {
                $gte: startOfWeek(parsedDate),
                $lt: endOfWeek(parsedDate),
              },
            },
          ];
        }
      } else {
        props.name = nameSearchRegex;
      }
    }

    Item.find(props)
      .exec()
      .then(async (items) => {
        const itemIds = items.map((item) => new ObjectId(item.id));
        const aggregate = await Tracks.aggregate([
          { $match: { user: new ObjectId(user), archived, item: { $in: itemIds } } },
          { $group: { _id: '$item', count: { $sum: 1 }, last: { $max: '$date' } } },
        ]).exec();

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
  });

const migrateTracks = async (cards) => {
  // cards.forEach((card) => {
  //   const tracks = imports[card.id];
  //   if (tracks) {
  //     console.log('delete all');
  //     TrackService.removeAll(card.id);
  //   }
  // });
  // cards.forEach((card) => {
  //   const tracks = imports[card.id];
  //   if (tracks) {
  //     console.log('IMPORT', tracks);
  //     const itemData = {
  //       name: card.name,
  //       user: card.user,
  //       tracks,
  //     };
  //     update(card.id, itemData);
  //   }
  // });
  const items = cards.filter((card) => card.tracks);
  console.log('MIGRATE >>>', items.length);
  items.forEach((item) => {
    item.tracks?.forEach((date) => {
      const data = {
        date,
        user: item.user,
        item: item.id,
      };
      // console.log('create', data);

      TrackService.create(data).catch(() => console.log('its okay'));
    });
    const itemData = {
      name: item.name,
      user: item.user,
      tracks: undefined,
    };
    // console.log('UPDTEA', itemData);
    unsetTracks(item.id, itemData);
  });
};

module.exports = {
  create,
  update,
  remove,
  get,
  all,
  migrateTracks,
};
