const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { validationResult } = require('express-validator');

const TrackCtrl = require('../controllers/track-ctrl');
const ItemCtrl = require('../controllers/item-ctrl');
const UserCtrl = require('../controllers/user-ctrl');

module.exports = (io) => {
  const router = express.Router();

  const checkAuth = (req, res, next) => {
    console.log('check auth', { user: req.user.id });
    if (!req.user) {
      return res.status(400).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { body } = req;

    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a body to update',
      });
    }

    return next();
  };

  const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.isEmpty());
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    return next();
  };

  router.use('/items', checkAuth);
  router.use('/item', checkAuth);
  router.use('/track', checkAuth);

  // Track
  router.post('/track', (req, res) => TrackCtrl.upsert(req, res, io)); // create new track
  router.put('/track/:id', (req, res) => TrackCtrl.upsert(req, res, io)); // update exisitng track
  router.delete('/track/:id', (req, res) => TrackCtrl.deleteTrack(req, res, io)); // delete track
  router.get('/track/:id', (req, res) => TrackCtrl.getTrackById(req, res, io)); // get item by id
  router.get('/track/:itemid', (req, res) => TrackCtrl.getTrackByItemId(req, res, io)); // get item by id

  // Item
  // router.post('/assistant', (req, res) => ItemCtrl.assistant(req, res, io));
  router.post('/item', ItemCtrl.validate, handleValidationErrors, (req, res) =>
    ItemCtrl.upsert(req, res, io),
  ); // create new item
  router.put('/item/:id', ItemCtrl.validate, handleValidationErrors, (req, res) =>
    ItemCtrl.upsert(req, res, io),
  ); // update exisitng item
  router.delete('/item/:id', (req, res) => ItemCtrl.deleteItem(req, res, io)); // delete item
  router.get('/items', (req, res) => ItemCtrl.getItems(req, res, io)); // get all items
  router.get('/item/:id', (req, res) => ItemCtrl.getItemById(req, res, io)); // get item by id

  // User
  router.get('/logout', (req, res) => UserCtrl.logout(req, res));
  router.get('/user', (req, res) => UserCtrl.getUser(req, res));

  return router;
};
