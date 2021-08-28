const Order = require('../model/order-model');

module.exports = {
  // obtener orden GET /orders/:orderId
  getOrders: async (req, res, next) => {
    try {
      const { orderId } = req.params;

      if (!orderId) {
        res.sendStatus(401);
      }
      const getOrder = await Order.findOne({ _id: orderId });
      if (!getOrder) {
        res.sendStatus(404);
      }
      return res.status(200).json(getOrder);
    } catch (err) {
      return next(404);
    }
  },
  // POST /orders
  postOrder: async (req, resp, next) => {
    try {
      const { userId, client, products } = req.body;

      if (!userId || !client || !products || products.length === 0) return next(400);

      const newOrder = new Order({
        userId,
        client,
        products,
      });

      const saveOrder = await newOrder.save();
      return resp.status(200).json(saveOrder);
    } catch (err) {
      next(err);
    }
  },

  // obtener orden por id orders/:orderId
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
  // PUT /orders
  putOrder: async (req, resp, next) => {
    try {
      const { orderId } = req.params;

      if (!orderId) return next(404);

      const orderUpdated = await Order.findByIdAndUpdate(orderId);

      resp.json(orderUpdated);
    } catch (error) {
      return next(error);
    }
  },

  // eliminar orden DELETE /orders
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
