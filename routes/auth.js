const express = require('express');
const router = express.Router();

//get log in User -- GET(/api/auth) -- private
router.get('/', (req, res) => {
  res.send('Get logged in User');
});

//log in User -- POST(/api/auth) -- public
router.post('/', (req, res) => {
  res.send('Log in User');
});

module.exports = router;
