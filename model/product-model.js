const mongoose = require('mongoose');
<<<<<<< HEAD
=======
const mongoosePaginate = require('mongoose-paginate-v2');
>>>>>>> 0656cf9457f28c3651c83c51ce1a49dbb7d7afb7

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: { Number, default: 0 },
      required: true,
    },
    image: {
      type: String,
      required: false,
      // default: 'burger1.jpg',
    },
    category: {
      type: String, enum: ['Almuerzo', 'Bebestibles'],
    },
    dateEntry: {
      type: Date,
      default: Date.now(),
      required: false,
    },
  },
  {
    versionKey: false,
  },
);

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);
