<<<<<<< HEAD
const { ObjectId } = require('mongoose').Types;

module.exports = {
  isValidMongoId: (id) => {
    if (ObjectId.isValid(id)) {
      if ((String)(new ObjectId(id)) === id) return true;
      return false;
    }
  },
  validOrderId: (req, resp, next) => {
    // eslint-disable-next-line no-unused-expressions
    (!module.exports.isValidMongoId(req.params.orderId))
      ? next(404)
      : next();
  },

};
=======
// const { ObjectId } = require('mongoose').Types;

// module.exports = {
//   isValidMongoId: (id) => {
//     if (ObjectId.isValid(id)) {
//       if ((String)(new ObjectId(id)) === id) return true;
//       return false;
//     }
//   },
//   validOrderId: (req, resp, next) => {
//     // eslint-disable-next-line no-unused-expressions
//     (!module.exports.isValidMongoId(req.params.orderId))
//       ? next(404)
//       : next();
//   },

// };
>>>>>>> 0656cf9457f28c3651c83c51ce1a49dbb7d7afb7
