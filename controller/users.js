// const bcrypt = require('bcrypt');
const User = require('../model/user-model');

module.exports = {
  getUsers: async (req, res) => {
    const users = await User.find();
    res.json(
      users.map((user) => ({
        _id: user._id,
        email: user.email,
        roles: user.roles,
      })),
    );
  },
  getUserId: async (req, res) => {
    const user = await User.findById(req.params.uid);
    res.json({
      _id: user._id,
      email: user.email,
      roles: user.roles,
    });
  },
  postUser: async (req, res) => {
    const newUser = await User.create(req.body);
    res.json({
      _id: newUser._id,
      email: newUser.email,
      roles: newUser.roles,
    });
  },
  putUser: async (req, res) => {
    const userUpdate = await User.findByIdAndUpdate(req.params.uid, req.body, {
      new: true,
    });
    res.json(userUpdate);
  },
  deleteUser: async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.uid);
    res.json({
      _id: deletedUser._id,
      email: deletedUser.email,
      roles: deletedUser.roles,
    });
  },

};
