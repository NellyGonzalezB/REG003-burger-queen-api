const Product = require('../model/product-model');
const Order = require('../model/order-model');
const { pagination } = require('./pagination');

// crear odenes
module.exports = {
  postOrder: async (req, resp, next) => {
    try {
      if (Object.keys(req.body).length === 0) return next(400);

      if (!req.body.products || req.body.products.length === 0) {
        return resp.sendStatus(400);
      }
      if (req.body.client === '') {
        return resp.sendStatus(400);
      }
      if (!req.body.userId) {
        return resp.sendStatus(400);
      }
      const fixedProducts = req.body.products.map((el) => ({
        qty: el.qty,
        product: el.productId,
      }
      ));
      const newOrder = new Order();
      newOrder.userId = req.body.userId;
      newOrder.client = req.body.client;
      newOrder.products = fixedProducts;

      const newOrderSaved = await newOrder.save();

      const populatedOrder = await newOrderSaved
        .populate('products.product')
        .execPopulate();

      return resp.status(200).send(populatedOrder);
    } catch (err) {
      return next(err);
    }
  },
  // postOrder: async (req, resp, next) => {
  //   try {
  //     if (Object.keys(req.body).length === 0) return next(400);
  //     const newOrder = new Order();
  //     newOrder.userId = req.body.userId;
  //     newOrder.client = req.body.client;
  //     newOrder.products = req.body.products.map((product) => ({
  //       qty: product.qty,
  //       product: product.productId,
  //     }));
  //     if (!req.body.products || req.body.products.length === 0) {
  //       return resp.sendStatus(400);
  //     }
  //     if (req.body.client === '') {
  //       return resp.sendStatus(400);
  //     }
  //     if (!req.body.userId) {
  //       return resp.sendStatus(400);
  //     }

  //     const newOrderSaved = await newOrder.save();

  //     const populatedOrder = await newOrderSaved
  //       .populate('products.product')
  //       .execPopulate();

  //     return resp.status(200).send(populatedOrder);
  //   } catch (err) {
  //     return next(err);
  //   }
  // },

  // obtener orden
  getOrders: async (req, resp, next) => {
    try {
      const options = {
        page: parseInt(req.query.page, 10) || 1,
        limit: parseInt(req.query.limit, 10) || 10,
      };
      const orders = await Order.paginate({}, options);
      const url = `${req.protocol}://${req.get('host') + req.path}`;

      const links = pagination(orders, url, options.page, options.limit, orders.totalPages);

      resp.links(links);
      if (!orders) {
        return resp.status(404).send({ message: 'Orden no encontrada' });
      }
      const orderPopulate = await Product.populate(orders.docs, { path: 'products.productId' });
      if (!orderPopulate) {
        return resp.status(404);
      }
      return resp.status(200).send(orderPopulate);
    } catch (err) {
      return next(err);
    }
  },

  // obtener orden por id
  getOrderById: async (req, resp, next) => {
    try {
      const { orderId } = req.params;
      if (!orderId.match(/^[0-9a-fA-F]{24}$/)) return next(404);
      const order = await Order.findOne({ _id: orderId });
      if (!order) {
        return resp.status(404).send({ message: 'Orden no encontrada' });
      }
      const orderPopulate = await Product.populate(order, { path: 'products.productId' });
      if (!orderPopulate) {
        return resp.status(404);
      }
      return resp.status(200).send(orderPopulate);
    } catch (err) {
      return next(err);
    }
  },
  // modificar order
  putOrder: async (req, resp, next) => {
    try {
      const { orderId } = req.params;
      if (!orderId.match(/^[0-9a-fA-F]{24}$/)) return next(404);
      const update = req.body;

      if (update.status === 'delivered') {
        update.dateProcessed = Date.now();
      }

      const orderUpdate = await Order.findByIdAndUpdate(orderId, update);

      if (!update.userId && !update.client && !update.products && !update.status) {
        return next(400);
      }
      switch (req.body.status) {
        case 'pending':
          break;
        case 'canceled':
          break;
        case 'delivering':
          break;
        case 'delivered':
          break;
        case 'preparing':
          break;
        default:
          return resp.status(400).send({ message: 'error de status' });
      }

      if (!orderUpdate) {
        return resp.status(404).send({ message: 'La orden no existe' });
      }
      const OrderNew = await Order.findById(orderId);

      return resp.status(200).send(OrderNew);
    } catch (err) {
      return next(err);
    }
  },

  // eliminar orden
  deleteOrder: async (req, resp, next) => {
    try {
      const { orderId } = req.params;
      if (!orderId.match(/^[0-9a-fA-F]{24}$/)) return next(404);
      const order = await Order.findById(orderId);
      if (!order) {
        return resp.status(404).send({ message: 'La orden no existe' });
      }
      const orderRemove = await order.remove();
      if (!orderRemove) {
        return resp.status(500).send({ message: 'Error al hacer la petición' });
      }
      return resp.status(200).send({ message: '¡orden eliminada con éxito!' });
    } catch (err) {
      return next(err);
    }
  },
};
