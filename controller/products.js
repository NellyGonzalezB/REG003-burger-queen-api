const Product = require('../model/product-model');
// const bcrypt = require('bcrypt');
module.exports = {
// obtener Productos
  getProducts: (req, resp) => {
    Product.find({}, (err, products) => {
      if (err) return resp.status(500).send({ message: `Error al realizar la petición: ${err}` });
      if (!products) return resp.status(404).send({ message: 'productos no existen' });

      resp.status(200).send(products);
    });
  },

  getProductId: (req, resp) => {
    // eslint-disable-next-line prefer-destructuring
    const productId = req.params.productId;

    Product.findById(productId, (err, product) => {
      if (err) return resp.status(500).send({ message: `Error al realizar la petición: ${err}` });
      if (!product) return resp.status(404).send({ message: 'El producto no existe' });

      resp.status(200).send({ product });
    });
  },

  postProduct: (req, resp) => {
    // eslint-disable-next-line no-console
    console.log('POST/products');
    // eslint-disable-next-line no-console
    console.log((req.body));

    const product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.category = req.body.category;
    product.dateEntry = req.body.dateEntry;

    product.save((err, productStored) => {
      if (err) return resp.status(500).send({ message: `Error al salver en la base de datos: ${err}` });

      return resp.status(200).send({ product: productStored });
    });
  },

  putProduct: (req, resp) => {
    // eslint-disable-next-line prefer-destructuring
    const productId = req.params.productId;
    const update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
      if (err) resp.status(500).send({ message: `Error al actualizar producto: ${err}` });

      resp.status(200).send({ message: productUpdate });
    });
  },

  deleteProduct: (req, resp) => {
    // eslint-disable-next-line prefer-destructuring
    const productId = req.params.productId;

    Product.findById(productId, (err, product) => {
      if (err) resp.status(500).send({ message: `Error al borrar producto: ${err}` });

      product.remove((err) => {
        if (err) resp.status(500).send({ message: `Error al borrar producto: ${err}` });
        resp.status(200).send({ message: 'El producto ha sido eliminado' });
      });
    });
  },
};
// @query {String} [limit=10] Cantitad de elementos por página
// @query {String} [page=1] Página del listado a consultar
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
