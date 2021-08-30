const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
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
// // eslint-disable-next-line func-names
// UserSchema.methods.toJSON = function () {
//   const { __v, password, ...user } = this.toObject();
//   return user;
// };

UserSchema.plugin(mongoosePaginate);

module.exports = model('User', UserSchema);
