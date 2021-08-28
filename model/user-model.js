const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new Schema(
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
UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

UserSchema.plugin(mongoosePaginate);

module.exports = model('User', UserSchema);

// const { Schema, model } = require('mongoose');

// const UserSchema = new Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       select: false,
//       required: true,
//     },
//     signDate: {
//       type: Date,
//       default: Date.now(),
//       required: false,

//     },
//     lastlogin: Date,
//     roles: { admin: { type: Boolean, default: false } },
//   },
// );

// Método pre, para hacer operaciones antes de que se guarden los datos en la BD
// eslint-disable-next-line func-names
// UserSchema.pre('save', function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const document = this;
//     bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
//       if (err) {
//         next(err);
//       } else {
//         document.password = hashedPassword;
//         next();
//       }
//     });
//   } else {
//     next();
//   }
// });

// // Para comparar el usuario es igual al que está guardado
// UserSchema.methods.comparePassword = async function comparePassword(password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (err) {
//     console.error(err);
//   }
// };
// UserSchema.methods.isCorrectPassword = function(password, callback){
//   bcrypt.compare(password, this.password, function(err, same){
//       if (err){
//           callback(err);
//       } else {
//           callback(err, same);
//       }
//     });
// }

// UserSchema.methods.encryptPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return bcrypt.hash(password, salt);
// };

module.exports = model('User', UserSchema);
