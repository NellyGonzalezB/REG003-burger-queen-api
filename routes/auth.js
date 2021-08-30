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

  app.post('/auth', (req, resp, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.status(400);
    }
    // TODO: autenticar a la usuarix
    // Problema coneccion con base de datos
    const findUser = User.findOne({ email });
    findUser.then((objUser) => {
      if (!objUser) {
        return resp.status(404).send({ message: 'Usuario no encontrado' });
      }
      console.log(email, password);
      console.log(objUser.email, objUser.password);
      bcrypt.compare(password, User.password, (err, result) => {
        console.log('soy user.password', User.password);
        console.log(email, password);
        console.log(objUser.email, objUser.password);
        if (err) console.info(err);
        // Aqui
        else if (!result) {
          console.log(result);
          return resp.status(404).send({ message: 'Contra incorrecta' });
        }
        // console.log('It matches');
        const token = jwt.sign({
          uid: objUser._id,
          email: objUser.email,
          roles: objUser.roles,
        }, secret);
        return resp.status(200).send({ token });
        // console.log('invalid');
      });
    });

    // console.log(findUser.password);
    // Aqui no pasa, $2b$10$BN76sNVVcxG9MgB71qFEdO67BV/I3ryNfnh1Ez0zvwCbchwjKmsu6

    // if (!passwordMatch) return next(401);// No autorizado
    // userModel.findOne({ email }, (err, user) => {
    //  if (err) return resp.status(500).send({ message: `Error al realizar la petición: ${err}` });
    //  if (!user) return resp.status(404).send({ message: 'usuario no existe' });
  });
  return nextMain();
};
