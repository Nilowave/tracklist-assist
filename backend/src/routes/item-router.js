const express = require('express');

const ItemCtrl = require('../controllers/item-ctrl');

module.exports = (io) => {
  const router = express.Router();

  router.post('/item', (req, res) => ItemCtrl.upsert(req, res, io));
  router.put('/item/:id', (req, res) => ItemCtrl.updateItem(req, res, io));
  router.delete('/item/:id', (req, res) => ItemCtrl.deleteItem(req, res, io));
  router.get('/item/:name', ItemCtrl.getItemByName);
  router.get('/items', (req, res) => ItemCtrl.getItems(req, res, io));

  return router;
};
