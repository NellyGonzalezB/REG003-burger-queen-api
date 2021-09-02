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
      _id: false,
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
<<<<<<< HEAD
    default: Date.now,
=======
>>>>>>> 0656cf9457f28c3651c83c51ce1a49dbb7d7afb7
    // required: true,
  },
}, { versionKey: false });

orderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', orderSchema);
