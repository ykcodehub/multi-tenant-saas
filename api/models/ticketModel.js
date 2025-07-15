const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    ticketId: { type: String, required: true },
    status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);