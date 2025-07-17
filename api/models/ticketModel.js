const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  ticketId: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String, required: true },
  status: { type: String, enum: ["pending", "done"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);
