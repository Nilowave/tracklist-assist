// eslint-disable-next-line import/no-extraneous-dependencies
// const { body } = require('express-validator');
const Track = require('../models/track-model');
const TrackService = require('../services/track-service');

// const validate = [body('name').notEmpty().withMessage('Name field is required.').trim()];

const upsert = (req, res) => {
  const { value, notes, item } = req.body;
  const user = req.user.id;
  const date = req.body.date || Date.now();
  const isNew = !req.params.id;

  const track = {
    date,
    user,
    item,
    value,
    notes,
  };

  let props;

  if (isNew) {
    props = [{ ...track }];
  } else {
    props = [req.params.id, { ...track }];
  }

  TrackService[isNew ? 'create' : 'update'](...props)
    .then(async (response) => {
      const count = await TrackService.count(user, item);

      const update = {
        track: response,
        count,
      };

      return res.status(200).json(update);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        error,
        message: 'Track not updated!',
      });
    });
};

const deleteTrack = async (req, res, io) => {
  await Track.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((item) => {
      if (!item) {
        return res.status(404).json({ success: false, error: 'Track not found' });
      }

      io.to(req.user.id).emit('message', { id: 'update', data: item });

      return res.status(200).json({ success: true, data: item });
    })
    .catch((err) => res.status(400).json({ success: false, error: err }));
};

const getTrackById = async (req, res) => {
  Track.findOne({ _id: req.params.id })
    .exec()
    .then((item) => {
      if (!item) {
        return res.status(404).json({ success: false, error: 'Track not found' });
      }

      return res.status(200).json({ success: true, data: item });
    })
    .catch((error) => res.status(400).json({ success: false, error }));
};

const getTrackByItemId = async (req, res) => {
  const user = req.user.id;

  TrackService.all(user, req.params.itemid)
    .then((items) => {
      if (!items) {
        return res.status(404).json({ success: false, error: 'Track not found' });
      }

      return res.status(200).json({ success: true, data: items });
    })
    .catch((error) => res.status(400).json({ success: false, error }));
};

module.exports = {
  upsert,
  deleteTrack,
  getTrackById,
  getTrackByItemId,
};
