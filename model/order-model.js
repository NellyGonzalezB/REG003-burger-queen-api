const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  client: {
    type: String,
  },
  dateEntry: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
});

module.exports = mongoose.model('Order', OrderSchema);
//     status: {
//       type: String,
//       default: 'pending',
//     },
//     dateEntry: {
//       type: Date,
//       default: Date.now(),
//       required: true,
//     },
//     dateProcessed: {
//       type: Date,
//     },
//   },
//   { versionKey: false },
// );

// orderSchema.plugin(mongoosePaginate);
// module.exports = model('Order', orderSchema);
