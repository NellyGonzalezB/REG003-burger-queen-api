const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: { Number, default: 0 },
    },
    image: {
      type: String,
      required: false,
      // default: 'burger1.jpg',
    },
    category: {
      type: String, enum: ['Almuerzo', 'Bebestibles', 'Pastelería'],
    },
    dateEntry: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  },
);

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);
