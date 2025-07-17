require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on 🛜  🛜   http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });
