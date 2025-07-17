const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);