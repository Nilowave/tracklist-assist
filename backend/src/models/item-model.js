const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema(
  {
    name: { type: String, required: true },
    tracks: { type: [Date], required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('items', Item);
