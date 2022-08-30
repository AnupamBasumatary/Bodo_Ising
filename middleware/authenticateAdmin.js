const jwt = require('jsonwebtoken');
const adminDb = require('../models/AdminSchema');

const secretKey = 'NewTechniques';

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const verifyToken = jwt.verify(token, secretKey);

    const validAdmin = await adminDb.findOne({ _id: verifyToken._id });

    if (!validAdmin) {
      throw new Error('Admin Not Found');
    }

    req.token = token;
    req.validAdmin = validAdmin;
    req.adminId = validAdmin._id;

    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: 'Unatuthorized No token provided',
    });
  }
};

module.exports = authenticateAdmin;
