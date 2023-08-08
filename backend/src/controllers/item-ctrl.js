// eslint-disable-next-line import/no-extraneous-dependencies
const { body } = require('express-validator');
const ItemService = require('../services/item-service');
const TrackService = require('../services/track-service');
const parseItemDates = require('../utils/parseItemDates');

const validate = [body('name').notEmpty().withMessage('Name field is required.').trim()];

const upsert = async (req, res) => {
  const user = req.user.id;
  const { name, archived } = req.body;
  const { count, last } = req.body;
  const isNew = !req.params.id;
  const firstCount = 1;
  const date = Date.now();

  let props;

  if (isNew) {
    props = [{ name, user }];
  } else {
    props = [req.params.id, { name, archived }];
  }

  ItemService[isNew ? 'create' : 'update'](...props)
    .then(async (item) => {
      if (isNew) {
        await TrackService.create({
          date,
          item: item.id,
          user,
        });
      }

      const data = {
        id: item.id,
        name,
        count: count || firstCount,
        last: last || date,
      };

      return res.status(200).json(data);
    })
    .catch((error) =>
      res.status(404).json({
        error,
        message: 'Item not updated!',
      }),
    );
};

const deleteItem = async (req, res, io) => {
  await ItemService.remove(req.params.id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ success: false, error: 'Item not found' });
      }

      io.to(req.user.id).emit('message', { id: 'update', data: item });

      return res.status(200).json({ success: true, data: item });
    })
    .catch((err) => res.status(400).json({ success: false, error: err }));
};

const getItemById = async (req, res) => {
  ItemService.get(req.params.id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ success: false, error: 'Item not found' });
      }

      const parsedItem = parseItemDates([item]);

      return res.status(200).json({ success: true, data: parsedItem[0] });
    })
    .catch((error) => res.status(400).json({ success: false, error }));
};

const getItems = async (req, res) => {
  const user = req.user.id;
  ItemService.all(user)
    .then((items) => res.status(200).json({ success: true, data: items }))
    .catch((error) => res.status(400).json({ success: false, error }));
};

module.exports = {
  upsert,
  deleteItem,
  getItems,
  getItemById,
  validate,
};
