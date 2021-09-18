const Item = require('../models/item-model');

const parseItemDates = require('../utils/parseItemDates');

upsert = (req, res, io) => {
  if (!req.user) {
    return res.status(400).json({
      success: false,
      error: 'User not authenticated',
    });
  }

  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  const { name } = req.body;
  const date = new Date().toString();

  Item.updateOne({ name }, { $push: { tracks: date }, user: req.user.id }, { upsert: true })
    .then((item) => {
      io.to(req.user.id).emit('message', { id: 'update', data: item });

      return res.status(200).json({
        success: true,
        id: item._id,
        message: 'Item updated!',
      });
    })
    .catch((error) => {
      return res.status(404).json({
        error,
        message: 'Item not updated!',
      });
    });
};

assistant = (req, res, io) => {
  const body = req.body;

  if (!body || !body.id) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  const { name, id } = req.body;
  const date = new Date().toString();

  Item.updateOne({ name, user: req.user.id }, { $push: { tracks: date } }, { upsert: true })
    .then((item) => {
      io.to(req.user.id).emit('message', { id: 'update', data: item });

      return res.status(200).json({
        success: true,
        id: item._id,
        message: 'Item updated!',
      });
    })
    .catch((error) => {
      return res.status(404).json({
        error,
        message: 'Item not updated!',
      });
    });
};

updateItem = async (req, res, io) => {
  if (!req.user) {
    res.redirect('/');
  }

  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  Item.findOne({ _id: req.params.id })
    .exec()
    .then((item) => {
      item.name = body.name;
      item.tracks = body.tracks;

      item
        .save()
        .then(() => {
          io.to(req.user.id).emit('message', { id: 'update', data: item });
          return res.status(200).json({
            success: true,
            id: item._id,
            message: 'Item updated!',
          });
        })
        .catch((error) => {
          return res.status(404).json({
            error,
            message: 'Item not updated!',
          });
        });
    })
    .catch((err) =>
      res.status(404).json({
        message: 'Item not found!',
      }),
    );
};

deleteItem = async (req, res, io) => {
  if (!req.user) {
    res.redirect('/');
  }

  await Item.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((item) => {
      if (!item) {
        return res.status(404).json({ success: false, error: `Item not found` });
      }

      io.to(req.user.id).emit('message', { id: 'update', data: item });

      return res.status(200).json({ success: true, data: item });
    })
    .catch((err) => res.status(400).json({ success: false, error: err }));
};

getItemByName = async (req, res) => {
  if (!req.user) {
    res.redirect('/');
  }

  await Item.findOne({ name: req.params.name }, (err, item) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!item) {
      return res.status(404).json({ success: false, error: `Item not found` });
    }
    return res.status(200).json({ success: true, data: item });
  }).catch((err) => console.log(err));
};

getItems = async (req, res) => {
  if (!req.user) {
    res.redirect('/');
  }

  await Item.find({ user: req.user.id })
    .exec()
    .then((items) => {
      const allItems = parseItemDates(items);

      return res.status(200).json({ success: true, data: allItems });
    })
    .catch((err) => res.status(400).json({ success: false, error: err }));
};

module.exports = {
  updateItem,
  deleteItem,
  getItems,
  getItemByName,
  upsert,
};
