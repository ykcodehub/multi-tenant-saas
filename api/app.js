const express = require('express');
const cors = require('cors');     
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const meRoutes = require("./routes/meRoutes");

app.use(cors());                  
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/me', meRoutes);
app.use('/api', require('./routes/ticketRoutes'));
app.use('/api', require('./routes/webhookRoutes'));



app.get('/', (req, res) => {
    res.send('Congrats Yogendra !! Successfully the API is running...');
});

module.exports = app;
