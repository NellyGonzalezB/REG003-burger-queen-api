/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-unresolved
const User = require('../model/user-model');

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next();
  }
  const [type, token] = authorization.split(' ');
  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  return jwt.verify(token, secret, async (err, decodedToken) => {
    if (err) {
      return next(403);
    }
    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
    const authUser = await User.findById(decodedToken.uid, { email: 1, roles: 1 });

    if (!authUser) {
      return next(403);
    }
    req.authUser = authUser;
    return next();
  });
};

// eslint-disable-next-line no-underscore-dangle
module.exports.isAuthenticated = (req) => (!!req.authUser && !!req.authUser._id);

module.exports.isAdmin = (req) => !!req.authUser.roles.admin;
module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    // eslint-disable-next-line max-len
    : (!module.exports.isAdmin(req) && !(req.authUser._id.toString() === req.params.uid || req.authUser.email === req.params.uid))
      ? next(403)
      : next()
);
