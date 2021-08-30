const Order = require('../model/order-model');
const { pagination } = require('../pagination');

// crear odenes
module.exports = {
  postOrder: async (req, resp, next) => {
    try {
      const { userId, client, products } = req.body;

      if (!userId || !client || !products || products.length === 0) return next(400);

      const newOrder = new Order({
        userId,
        client,
        products: products.map((product) => ({
          qty: product.qty,
          product: product.productId,
        })),
      });

      // Guardar en database
      await newOrder.save();

      const completeOrder = await newOrder.populate('products.product')
        .execPopulate();

      return resp.json(completeOrder);
    } catch (error) {
      return next(error);
    }
  },

  // obtener orden
  getOrders: async (req, resp, next) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    try {
      const orders = await Order.paginate({}, { limit, page });

      const url = `${req.protocol}://${req.get('host')}${req.path}`;

      const links = pagination(orders, url, page, limit, orders.totalPages);

      resp.links(links);

      if (!orders) {
        return next(404);
      }

      return resp.json(orders.docs);
    } catch (error) {
      return next(error);
    }
  },

  // obtener orden por id
  getOrderById: async (req, resp, next) => {
    try {
      const { orderId } = req.params;
      const orderById = await Order.findById(orderId);
      if (!orderById) {
        return next(404);
      }
      const order = await orderById.populate('products.product')
        .execPopulate();

      resp.json(order);
    } catch (error) {
      return next(error);
    }
  },

  // modificar order
  putOrder: async (req, res, next) => {
    const { orderId } = req.params;

    const {
      status,
    } = req.body;

    try {
      if (Object.keys(req.body).length === 0) return next(400);

      const statusOrder = [
        'pending',
        'canceled',
        'delivering',
        'delivered',
      ];
      if (status && !statusOrder.includes(status)) return next(400);

      const orderUpdated = await Order.findOneAndUpdate(
        { _id: orderId },
        { $set: req.body },
        { new: true, useFindAndModify: false },
      );
      return res.status(200).json(orderUpdated);
    } catch (err) {
      next(404);
    }
  },

  // eliminar orden
  deleteOrder: async (req, resp, next) => {
    try {
      const { orderId } = req.params;

      if (!orderId) return next(404);

      const orderById = await Order.findByIdAndDelete(orderId);

      resp.json(orderById);
    } catch (error) {
      return next(error);
    }
  },

};
