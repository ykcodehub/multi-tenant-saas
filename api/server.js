// require("dotenv").config();
// const app = require("./app");
// const connectDB = require("./config/db");

// const PORT = process.env.PORT || 8000;

// connectDB()
//   .then(() => {
//     app.listen(PORT, "0.0.0.0", () =>
//       console.log(`Server running on 🛜  🛜   http://localhost:${PORT}`)
//     );
//   })
//   .catch((err) => {
//     console.error("DB connection failed:", err);
//   });

require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const meRoutes = require('./routes/meRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const connectDB = require("./config/db")

app.use(cors());
app.use(express.json());

app.use('/api/me', meRoutes);
app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => {
  res.send('API is running.............');
});

const PORT = process.env.PORT || 8000;
connectDB()
.then(() => {
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server running on  🛜   http://localhost:${PORT}`)
  );
})
.catch((err) => {
  console.error("DB connection failed:", err);
});
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
