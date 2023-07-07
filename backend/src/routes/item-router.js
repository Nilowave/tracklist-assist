const express = require('express');

const ItemCtrl = require('../controllers/item-ctrl');
const UserCtrl = require('../controllers/user-ctrl');

module.exports = (io) => {
  const router = express.Router();

  router.post('/assistant', (req, res) => ItemCtrl.assistant(req, res, io));
  router.post('/item', (req, res) => ItemCtrl.upsert(req, res, io));
  router.put('/item/:id', (req, res) => ItemCtrl.updateItem(req, res, io));
  router.delete('/item/:id', (req, res) => ItemCtrl.deleteItem(req, res, io));
  // router.get('/item/:name', ItemCtrl.getItemByName);
  router.get('/items', (req, res) => ItemCtrl.getItems(req, res, io));
  router.get('/item/:id', (req, res) => ItemCtrl.getItemById(req, res, io));

  // User
  router.get('/logout', (req, res) => UserCtrl.logout(req, res));
  router.get('/user', (req, res) => UserCtrl.getUser(req, res));

  return router;
};
