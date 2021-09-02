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
