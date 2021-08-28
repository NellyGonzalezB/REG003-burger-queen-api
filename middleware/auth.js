const jwt = require('jsonwebtoken');
const User = require('../model/user-model');
// const config = require('../config');

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  // TODO: Verificar identidad del usuario usando `decodeToken.uid`

  jwt.verify(token, secret, async (err, decodedToken) => {
    if (err) {
      return next(403);
    }
    const checkUser = await User.findOne({ _id: decodedToken.uid });
    try {
      if (!checkUser) {
        return next(404);
      }
      req.authToken = decodedToken;
      return next();
    } catch (error) {
      return next(error);
    }
  });
};

// TODO: decidir por la informacion del request si la usuaria esta autenticada
module.exports.isAuthenticated = (req) => req.authToken.user;

// TODO: decidir por la informacion del request si la usuaria es admin
module.exports.isAdmin = (req) => req.authToken.user.roles.admin;

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
