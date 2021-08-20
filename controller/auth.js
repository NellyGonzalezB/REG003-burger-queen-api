module.exports = {
  isAuthenticated: (req, res) => {
    res.status(200).send({ message: 'tienes accesos' });
  },
};
