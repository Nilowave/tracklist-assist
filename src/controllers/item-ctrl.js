const Item = require('../models/item-model');

upsert = (req, res, io) => {
  console.log(io);
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  console.log(req.body);

  const { name } = req.body;
  const date = new Date().toString();

  Item.updateOne({ name }, { $push: { tracks: date } }, { upsert: true })
    .then((item) => {
      console.log('success');
      io.sockets.emit('message', { id: 'update', data: item });
      return res.status(200).json({
        success: true,
        id: item._id,
        message: 'Item updated!',
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).json({
        error,
        message: 'Item not updated!',
      });
    });
};

createItem = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an item',
    });
  }

  const item = new Item(body);

  if (!item) {
    return res.status(400).json({ success: false, error: err });
  }

  item
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: item._id,
        message: 'Item created!',
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Item not created!',
      });
    });
};

updateItem = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  Item.findOne({ _id: req.params.id }, (err, item) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Item not found!',
      });
    }
    item.name = body.name;
    item.time = body.time;
    item.rating = body.rating;
    item
      .save()
      .then(() => {
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
  });
};

deleteItem = async (req, res) => {
  await Item.findOneAndDelete({ _id: req.params.id }, (err, item) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!item) {
      return res.status(404).json({ success: false, error: `Item not found` });
    }

    return res.status(200).json({ success: true, data: item });
  }).catch((err) => console.log(err));
};

getItemById = async (req, res) => {
  await Item.findOne({ _id: req.params.id }, (err, item) => {
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
  await Item.find({}, (err, items) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!items.length) {
      return res.status(404).json({ success: false, error: `Item not found` });
    }
    return res.status(200).json({ success: true, data: items });
  }).catch((err) => console.log(err));
};

module.exports = {
  createItem,
  updateItem,
  deleteItem,
  getItems,
  getItemById,
  upsert,
};
