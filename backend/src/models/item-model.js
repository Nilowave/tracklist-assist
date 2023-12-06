const mongoose = require('mongoose');

const { Schema } = mongoose;

const Item = new Schema(
  {
    name: { type: String, required: true },
    archived: { type: Boolean },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true },
);

Item.index({ name: 'text' });
Item.index({ createdAt: 1 });

module.exports = mongoose.model('items', Item);
