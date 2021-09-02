const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const mongoosePaginate = require('mongoose-paginate-v2');

// eslint-disable-next-line no-undef
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,

    },
    signDate: {
      type: Date,
      default: Date.now(),

      required: false,
    },
    lastlogin: Date,
    roles: { admin: { type: Boolean, default: false } },
  },
);
// eslint-disable-next-line func-names
// eslint-disable-next-line no-undef
// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
