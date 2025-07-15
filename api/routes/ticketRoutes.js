const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/tickets', async (req, res) => {
    const { customerId, ticketId } = req.body;
    try {
        await axios.post('http://n8n:5678/webhook/test', { customerId, ticketId });
        res.json({ message: "Workflow triggered for ticket." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to trigger workflow" });
    }
});

module.exports = router;
