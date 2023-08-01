const Item = require('../models/item-model');

const parseItemDates = require('../utils/parseItemDates');

const itemEventEmitter = Item.watch();

itemEventEmitter.on('change', (change) => {
  console.log('update some items');
  console.log(JSON.stringify(change));
});

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
  // const date = new Date().toString();
  const date = Date.now();

  Item.updateOne({ name }, { $push: { tracks: date }, user: req.user.id }, { upsert: true })
    .then((item) => {
      console.log('socket update', req.user.id);
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
      error: 'You must provide a body with id to update',
    });
  }

  const { name, id } = req.body;
  // const date = new Date().toString();
  const date = Date.now();

  Item.updateOne({ name, user: id }, { $push: { tracks: date } }, { upsert: true })
    .then((item) => {
      io.to(id).emit('message', { id: 'update', data: item });
      return res.status(200).json({
        success: true,
        id: item._id,
        message: 'Item updated!',
      });
    })
    .catch((error) => {
      console.log('track error', error);
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

      const { tracks } = body;
      const updateTracks = tracks.map((date) => {
        return new Date(date).getTime();
      });
      item.tracks = updateTracks;

      item
        .save()
        .then(() => {
          console.log('socket update here', req.user.id);
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

  await Item.findOne({ name: req.params.name })
    .exec()
    .then((item) => {
      if (!item) {
        return res.status(404).json({ success: false, error: `Item not found` });
      }

      const parsedItem = parseItemDates([item]);

      return res.status(200).json({ success: true, data: parsedItem[0] });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error });
    });
};

getItemById = async (req, res) => {
  if (!req.user) {
    res.redirect('/');
  }

  Item.findOne({ _id: req.params.id })
    .exec()
    .then((item) => {
      if (!item) {
        return res.status(404).json({ success: false, error: `Item not found` });
      }

      const parsedItem = parseItemDates([item]);

      return res.status(200).json({ success: true, data: parsedItem[0] });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error });
    });
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
  getItemById,
  upsert,
  assistant,
};
