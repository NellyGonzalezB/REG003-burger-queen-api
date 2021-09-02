// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const config = require('../config');
// const User = require('../model/user-model');

// const { secret } = config;

// // TODO autentificar o validar al usuario
// module.exports = (app, nextMain) => {
//   app.post('/auth', async (req, resp, next)  => {

//     const { email, password } = req.body;

//     if (!email || !password) {
//       return next(400);
//     }
//     //validar email del usuario
//     const authUser = await User.findOne({ email });

//     if (!authUser) {
//       return next(404);
//     }
//     //validar password del usuario
//     const authPassword = bcrypt.compareSync(password, authUser.password);
//     if (!authPassword) {
//       return next(401);
//     }

//     const token = jwt.sign(

//       {
//         uid: authUser._id,
//         email: authUser.email,
//         roles: authUser.roles,
//       },
//       secret,
//       // {
//       //   // expiresIn: '3h',
//       // // },
//       // (err, token) => {
//       //   if (err) console.error(err);

//       // },
//     );
//     return resp.status(200).json({ token });
//   });
//   return nextMain();
// };
