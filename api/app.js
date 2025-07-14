const express = require('express');
const app = express();
require("dotenv").config();
// const userRoutes = require('./routes/userRoutes');

//update authentaction k time
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const meRoutes = require("./routes/meRoutes");


app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/me', meRoutes);


app.get('/', (req, res) => {
    res.send('Congrats Yogendra !! Sucessfully the API is running...🙋‍♂️ || let code it more and more');
});

module.exports = app;