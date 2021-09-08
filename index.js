const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');

const { port, dbUrl, secret } = config;

const app = express();
// eslint-disable-next-line no-console
console.log(dbUrl);

// TODO: Conexión a la Base de Datos (MongoDB o MySQL)
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  // eslint-disable-next-line no-console
  .then(console.log('DB esta conectada'))
  .catch((err) => console.error(err));

//

app.set('config', config);
app.set('pkg', pkg);
// parse application/x-www-form-urlencoded
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware(secret));

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});
