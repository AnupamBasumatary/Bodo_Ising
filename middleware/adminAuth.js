const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No Admin Token, Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('adminSecret'));

    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Admin token is not Valid' });
  }
};
