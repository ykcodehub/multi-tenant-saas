require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware imports
const { verifyToken } = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const errorHandler = require("./middleware/errorHandler");

// Express middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/me", verifyToken, require("./routes/meRoutes"));
app.use("/api/users", verifyToken, require("./routes/userRoutes"));
app.use("/api/tickets", verifyToken, require("./routes/ticketRoutes"));
app.use(
  "/admin",
  verifyToken,
  roleMiddleware.restrictTo("admin"),
  require("./routes/adminRoutes")
);
app.use("/api", require("./routes/webhookRoutes"));

// Health check
app.get("/", (req, res) => res.send("API is up and running!"));

// Global error handler
app.use(errorHandler);

module.exports = app;
