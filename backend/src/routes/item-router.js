const express = require('express');

const ItemCtrl = require('../controllers/item-ctrl');

module.exports = (io) => {
  const router = express.Router();

  router.post('/item', (req, res) => ItemCtrl.upsert(req, res, io));
  router.put('/item/:id', ItemCtrl.updateItem);
  router.delete('/item/:id', (req, res) => ItemCtrl.deleteItem(req, res, io));
  router.get('/item/:id', ItemCtrl.getItemById);
  router.get('/items', (req, res) => ItemCtrl.getItems(req, res, io));

  return router;
};
