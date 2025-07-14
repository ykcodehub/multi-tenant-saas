const express = require(`express`);
const app = express();
const userRoutes = require(`./routes/userRoutes`);

app.use(express.json);
//sample route
app.use(`/api/users`, userRoutes);

app.get(`/`,(req, res) => {
    res.send(`API is running.....`);
} );

module.exports = app;