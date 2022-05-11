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
app.use('/api/useritem', require('./routes/userItem'));

app.listen(PORT, console.log(`server started on port : ${PORT}`));
