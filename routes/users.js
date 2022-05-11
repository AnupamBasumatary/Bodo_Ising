const express = require('express');
const router = express.Router();

//Register User -- POST(/api/users) -- public
router.post('/', (req, res) => {
  res.send('Register a User');
});

module.exports = router;
