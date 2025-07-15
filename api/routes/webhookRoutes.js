const express = require('express');
const Ticket = require('../models/ticketModel'); // ya jo bhi tera model hai
const router = express.Router();

router.post('/webhook/ticket-done', async (req, res) => {
    const sharedSecret = req.headers['shared-secret'];
    if (sharedSecret !== process.env.WEBHOOK_SECRET) {
        return res.status(403).json({ error: "Invalid secret" });
    }

    const { ticketId } = req.body;
    try {
        await Ticket.findByIdAndUpdate(ticketId, { status: "Done" });
        res.json({ message: "Ticket updated." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update ticket." });
    }
});

module.exports = router;
