const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tracklist';
// const uri = process.env.MONGODB_URI || harduri || 'mongodb://127.0.0.1:27017/tracklist';

mongoose.connect(uri, { useNewUrlParser: true }).catch((e) => {
  console.error('Connection error', e.message);
});

const db = mongoose.connection;

module.exports = db;
