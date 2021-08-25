const User = require('../model/user-model');

module.exports = {
  // obtener usuarios
  getUsers: (req, resp) => {
    User.find({}, (err, users) => {
      if (err) return resp.status(500).send({ message: `Error al realizar la petición: ${err}` });
      if (!users) return resp.status(404).send({ message: 'useros no existen' });
      resp.status(200).send(users);
    });
  },

  getUserId: (req, resp) => {
    // eslint-disable-next-line prefer-destructuring
    const userId = req.params.userId;
    User.findById(userId, (err, user) => {
      if (err) return resp.status(500).send({ message: `Error al realizar la petición: ${err}` });
      if (!user) return resp.status(404).send({ message: 'El usuario no existe' });

      resp.status(200).send({ user });
    });
  },

  postUser: (req, resp) => {
    // eslint-disable-next-line no-console
    console.log('POST/users');
    // eslint-disable-next-line no-console
    console.log((req.body));
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.signDate = req.body.signpDate;
    user.save((err, userStored) => {
      if (err) resp.status(500).send({ message: `Error al salver user en la base de datos: ${err}` });
      resp.status(200).send({ user: userStored });
    });
  },
  putUser: (req, resp) => {
    // eslint-disable-next-line prefer-destructuring
    const userId = req.params.userId;
    const update = req.body;
    User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
      if (err) resp.status(500).send({ message: `Error al actualizar usero: ${err}` }); 
      resp.status(200).send({ message: userUpdate });
    });
  },
  deleteUser: (req, resp) => {
    // eslint-disable-next-line prefer-destructuring
    const userId = req.params.userId;
    User.findById(userId, (err, user) => {
      if (err) resp.status(500).send({ message: `Error al borrar usero: ${err}` });
      user.remove((err) => {
        if (err) resp.status(500).send({ message: `Error al borrar usero: ${err}` });
        resp.status(200).send({ message: 'El usero ha sido eliminado' });
      });
    });
  },
};

// module.exports = {
//   getUsers: (req, resp, next) => {
//   // Pagina a consultar
//   // Limite de elementos por pagina
//   // const url = `${req.protocol}://${req.get("host")}${req.path}`;
//     // const pageCurrent = parseInt(page, 10) || 1;
//     // const limitNumber = parseInt(limit, 10) || 10;
//     // const url = `${req.protocol}://${req.get('host')}${req.path}`;
//      //crear usuario
//     User = new User({
//         email: req.body.email,
//       })

//   },
//   getUsers: (req, resp, next) => {
//     //salvar el usuario
//     User.save((err) => {
//         if (err) res.status(500).send({ message: `Error al crear el usuario: ${err}` });

//         return res.status(200).send({ token: service.createToken(user) });
//     });
// },
// }
