const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
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
// Método pre, para hacer operaciones antes de que se guarden los datos en la BD
// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

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

module.exports = mongoose.model('User', UserSchema);
