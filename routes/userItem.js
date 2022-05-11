const express = require('express');
const router = express.Router();

//Get User Details-- GET(/api/useritem) -- private
router.get('/', (req, res) => {
  res.send('get user details');
});

//Add User Details -- POST(/api/auth) -- private
router.post('/', (req, res) => {
  res.send('add user details');
});

//Update User Details -- PUT(/api/auth) --private
router.put('/:id', (req, res) => {
  res.send('update user details');
});

//Delete User -- DELETE(/api/auth) --private
router.delete('/:id', (req, res) => {
  res.send('Delete user');
});

module.exports = router;
