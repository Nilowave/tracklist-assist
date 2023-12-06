const mongoose = require('mongoose');

const { Schema } = mongoose;

const Pixel = new Schema(
  {
    hash: { type: String, required: true },
  },
  { timestamps: true },
);

Pixel.index({ createdAt: 1 });

module.exports = mongoose.model('pixels', Pixel);
