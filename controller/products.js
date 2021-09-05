const Product = require('../model/product-model');
const { pagination } = require('./pagination');

module.exports = {
// obtener Productos
  getProducts: async (req, resp, next) => {
    try {
      const options = {
        page: parseInt(req.query.page, 10) || 1,
        limit: parseInt(req.query.limit, 10) || 10,
      };
      const products = await Product.paginate({}, options);

      const url = `${req.protocol}://${req.get('host') + req.path}`;

      const links = pagination(products, url, options.page, options.limit, products.totalPages);

      resp.links(links);
      return resp.status(200).json(products.docs);
    } catch (err) {
      return next(err);
    }
  },
  // obtener producto por id
  getProductId: async (req, resp, next) => {
    try {
      const { productId } = req.params;
      if (!productId.match(/^[0-9a-fA-F]{24}$/)) return next(404);
      const product = await Product.findById(productId);

      if (!product) {
        return resp.status(404).send({ message: 'El producto no existe' });
      }
      return resp.status(200).send(product);
    } catch (err) {
      return next(err);
    }
  },
  // registrar productos

  postProduct: async (req, resp, next) => {
    try {
      const product = new Product();
      product.name = req.body.name;
      product.price = req.body.price;
      // product.image = req.body.image;
      product.category = req.body.category;
      product.dateEntry = req.body.dateEntry;
      if (!req.body.name || !req.body.price) {
        return next(400);
      }
      const saveProduct = await product.save();
      // eslint-disable-next-line no-console
      console.log(saveProduct);
      if (!saveProduct) {
        return resp.status(400).send({ message: 'Error al salvar en la base de datos' });
      }
      return resp.status(200).send(saveProduct);
    } catch (err) {
      return next(err);
    }
  },
  // modificar producto
  putProduct: async (req, resp, next) => {
    try {
      const { productId } = req.params;
      if (!productId.match(/^[0-9a-fA-F]{24}$/)) return next(404);
      const update = req.body;
      if (req.body.name === '' && req.body.price === '') {
        return next(400);
      }
      if (typeof req.body.price !== 'number' && typeof req.body.name !== 'string') {
        return next(400);
      }
      const productUpdate = await Product.findByIdAndUpdate(productId, update);

      if (!productUpdate) {
        return resp.status(404).send({ message: 'El producto no existe' });
      }

      const productNew = await Product.findById(productId);

      return resp.status(200).send(productNew);
    } catch (err) {
      return next(err);
    }
  },

  // DELETE
  deleteProduct: async (req, resp, next) => {
    try {
      const { productId } = req.params;
      if (!productId.match(/^[0-9a-fA-F]{24}$/)) return next(404);
      const product = await Product.findById(productId);
      if (!product) {
        return resp.status(404).send({ message: 'El producto no existe' });
      }
      const productRemove = await product.remove();
      if (!productRemove) {
        return resp.status(500).send({ message: 'Error al hacer la petición' });
      }
      return resp.status(200).send({ message: 'se eliminó el producto' });
    } catch (err) {
      return next(err);
    }
  },

};
