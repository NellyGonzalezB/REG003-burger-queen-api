const User = require('../model/user-model');
const service = require('../services');

module.exports = {
  getUsers: (req, resp, next) => {
  // Pagina a consultar
  // Limite de elementos por pagina
  // const url = `${req.protocol}://${req.get("host")}${req.path}`;
    const pageCurrent = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const url = `${req.protocol}://${req.get('host')}${req.path}`;
  },
  signUp: (req, res) => {
    const user = new User({
      email: req.body.email,
    });
    user.save((err) => {
      if (err) res.status(500).send({ message: `Error al crear el usuario: ${err}` });

      return res.status(200).send({ token: service.createToken(user) });
    });
  },
  signIn: (req, res) => {
    User.find({ email: req.body.email }, (err, user) => {
      // si hubo un error
      if (err) return res.status(500).send({ mesage: err });
      // si el usuario no existe
      if (!user) return res.status(404).send({ message: 'no existe el usuario' });
      req.user = user;
      res.status(200).send({
        message: 'Te has logueado correctamente',
        token: service.createToken(user),
      });
    });
  },
  postUser: (req, resp, next) => {
    const { email, password, roles } = req.body;
    // const nuevoUsuario = new User({ email, password });
    // User.save(err => {
    //   if (err) {

    //   } else {
    //     }
    //   });
  },
  putUser: (req, res, next) => {
  },
  deleteUser: (req, res, next) => {
  },
};
// @query {String} [limit=10] Cantitad de elementos por página
// @query {String} [page=1] Página del listado a consultar
