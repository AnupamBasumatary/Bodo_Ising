const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/Users');

const jwtSecret = config.get('jwtSecret');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const verifyToken = jwt.verify(token, jwtSecret);

    const validUser = await User.findById(verifyToken.user.id);

    if (!validUser) {
      throw new Error('User Not Found');
    }

    req.token = token;
    req.user = validUser;

    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      msg: 'Unauthorized No token provided',
    });
  }
};
