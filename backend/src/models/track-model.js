const mongoose = require('mongoose');

const { Schema } = mongoose;

const Track = new Schema(
  {
    date: { type: Number, required: true, unique: true },
    value: { type: Number },
    notes: { type: String },
    archived: { type: Boolean },
    item: {
      type: Schema.Types.ObjectId,
      ref: 'items',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('tracks', Track);
