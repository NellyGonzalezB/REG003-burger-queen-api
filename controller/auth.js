/* eslint-disable max-len */
// const mongoose = require('mongoose');
// const userModel = require('../model/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../model/user-model');

const { secret } = config;

module.exports = {
  postAuth: (req, resp, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.status(400);
    }
    // TODO: autenticar a la usuarix

    const findUser = User.findOne({ email });
    if (!findUser) {
      return resp.status(404).send({ message: 'Usuario no encontrado' });
    }
    const passwordMatch = bcrypt.compareSync(password, findUser.password);
    if (!passwordMatch) return next(401);// no esta autorizado
    // userModel.findOne({ email }, (err, user) => {
    //   if (err) return resp.status(500).send({ message: `Error al realizar la petición: ${err}` });
    //   if (!user) return resp.status(404).send({ message: 'usuario no existe' });

    const token = jwt.sign({
      uid: findUser._id,
      email: findUser.email,
      roles: findUser.roles,
    }, secret);
    resp.status(200).send({ token });
  },
};
