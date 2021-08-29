const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../model/user-model');

const { secret } = config;

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
      return resp.status(400);
    }
    // TODO: autenticar a la usuarix

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return resp.status(404).send({ message: 'Usuario no encontrado' });
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) return next(401);// No autorizado
    // userModel.findOne({ email }, (err, user) => {
    //  if (err) return resp.status(500).send({ message: `Error al realizar la petición: ${err}` });
    //  if (!user) return resp.status(404).send({ message: 'usuario no existe' });

    const token = jwt.sign({
      uid: findUser._id,
      email: findUser.email,
      roles: findUser.roles,
    }, secret);
    return resp.status(200).send({ token });
  });
  return nextMain();
};
