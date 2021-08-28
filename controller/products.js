const Product = require('../model/product-model');
const { pagination } = require('../pagination');

module.exports = {
// obtener Productos
  getProducts: async (req, resp, next) => {
    // @query {String} [limit=10] Cantitad de elementos por página
    // @query {String} [page=1] Página del listado a consultar
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    try {
      const products = await Product.paginate({}, { limit, page });

      const url = `${req.protocol}://${req.get('host')}${req.path}`;

      const links = pagination(products, url, page, limit, products.totalPages);

      resp.links(links);

      if (!products) {
        return next(404);
      }

      return resp.json(products.docs);
    } catch (error) {
      return next(error);
    }
  },

  getProductId: async (req, resp, next) => {
    try {
      const { productId } = req.params;

      const productById = await Product.findById(productId);

      if (!productById) {
        return next(404);
      }

      resp.json(productById);
    } catch (error) {
      return next(error);
    }
  },

  postProduct: async (req, resp) => {
    const newProduct = new Product();
    newProduct.name = req.body.name;
    newProduct.price = req.body.price;
    newProduct.image = req.body.image;
    newProduct.category = req.body.category;
    newProduct.dateEntry = req.body.dateEntry;

    await newProduct.save((err, productStored) => {
      if (err) resp.status(500).send({ message: `Error al salver en la base de datos: ${err}` });

      resp.status(200).send({ newProduct: productStored });
    });
  },
  // Editar productos
  putProduct: async (req, resp) => {
    const editProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true },
    );
    resp.json(editProduct);
  },

  deleteProduct: async (req, resp, next) => {
    const { productId } = req.params;

    const productDeleteId = await Product.findByIdAndDelete(productId);
    if (!productDeleteId) {
      return next(404);
    }

    resp.json(productDeleteId);
  },
};

// Metodo http y codigo de respuestas
// 'use strict'
// const expresps = require('expresps');
// const bodyParser = require('body-parser');

// const app = expresps()
// const port = process.env.PORT || 8080

// Hacer api respt de una tienda ficticia online
// crearndo peticion tipo get para que muestre todos los productos
// app.get('/api/product', (req, resp) =>{
// resp.send(200,{products: []})
// })

// crearndo peticion tipo post para subir  los productos
// app.post('/api/product', (req, resp) => {
// console.log(req.body)
// resp.status(200).send({message: 'el producto se a recibido'})
// })

// app.delete('/api/product', (req, resp) => {
// });

// app.listen(port, () =>{
//     console.log(`API respT respondio correctamente en http://localhost:${port}`);
// })
