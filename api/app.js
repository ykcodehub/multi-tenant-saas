const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { verifyToken } = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/me", verifyToken, require("./routes/meRoutes"));
app.use("/api/users", verifyToken, require("./routes/userRoutes"));
app.use("/api/tickets", verifyToken, require("./routes/ticketRoutes"));
app.use("/admin", verifyToken, roleMiddleware.restrictTo("admin"), require("./routes/adminRoutes"));
app.use("/api", require("./routes/webhookRoutes"));

app.get("/", (req, res) => res.send("API is running!"));

app.use(errorHandler);

module.exports = app;