const jwt = require('jsonwebtoken');
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

  jwt.verify(token, secret, async (err, decodedToken) => {
    if (err) {
      return next(403);
    }

    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
    try {
      const userValidate = await User.findById({ _id: decodedToken.uid });
      if (!userValidate) {
        return resp.status(404).send({ message: 'Usuario no encontrado' });
      }
      const userValidateObject = userValidate;
      Object.assign(req.headers, userValidateObject);
      next();
    } catch (error) {
      return next(403);
    }
    // const payload = jwt.decodedToken(decodedToken.uid, config.secret);
    // if (payload.exp <= moment().unix()) {
    //   return resp.status(401).isAuthenticated({ message: 'el Token ha expirado' });
    // }
    // req.user = payload.sub;
    // next();
  });
};

module.exports.isAuthenticated = (req) => (
  // TODO: decidir por la informacion del request si la usuaria esta autenticada
  false
);

module.exports.isAdmin = (req) => (req.headers.userValidate.roles.admin);
// TODO: decidir por la informacion del request si la usuaria es admin

module.exports.requireAuth = (req, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
