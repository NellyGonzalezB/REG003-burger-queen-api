const jwt = require('jsonwebtoken');
const User = require('../model/user-model');
const config = require('../config');

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }
  // eslint-disable-next-line no-console
  console.log('soy secret', config.secret);

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(403);
    }

    // TODO: Verificar identidad del usuario usando `decodeToken.uid`

    User.findOne({ _id: decodedToken.uid }, (err, user) => {
      if (err) return next(403);

      if (!user) return next(404);

      req.headers.user = user;
      next();
    });
  });
};

// TODO: decidir por la informacion del request si la usuaria esta autenticada
module.exports.isAuthenticated = (req) => {
  // eslint-disable-next-line no-console
  console.log('soy user req', req.headers.user);
  return req.headers.user;
};

// TODO: decidir por la informacion del request si la usuaria es admin
module.exports.isAdmin = (req) => req.headers.user.roles.admin;

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
