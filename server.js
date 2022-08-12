const express = require('express');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

//Connecting to Database
connectDB();

app.use(express.json({ extended: false }));

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/userdet', require('./routes/userDet'));
app.use('/api/savefood', require('./routes/selectFood'));
app.use('/api/food', require('./routes/food'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/adminAuth', require('./routes/adminAuth'));

app.listen(PORT, console.log(`server started on port : ${PORT}`));
