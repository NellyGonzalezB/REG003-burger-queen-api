const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../model/user-model');

const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', async (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }

    // TODO: autenticar a la usuarix
    const findUser = await User.findOne({ email }).select('+password');
    if (findUser === null) {
      return next(404);
    } if (bcrypt.compareSync(password, findUser.password)) {
      const token = jwt.sign({ uid: findUser._id }, secret);
      resp.send({ token });
    } else {
      return next(401);
    }
  });

  return nextMain();
};
