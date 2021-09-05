const mongoose = require('mongoose');
const { Schema } = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const mongoosePaginate = require('mongoose-paginate-v2');

const orderSchema = new Schema({

  userId: {
    type: String,
  },
  client: {
    type: String,
  },
  products: [
    {
      qty: {
        type: Number,
        default: 1,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'canceled', 'delivering', 'delivered', 'preparing'],
    default: 'pending',
  },
  dateEntry: {
    type: Date,
    default: Date.now,
    // required: true,
  },
  dateProcessed: {
    type: Date,
    // required: true,
  },
}, { versionKey: false });

orderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', orderSchema);
