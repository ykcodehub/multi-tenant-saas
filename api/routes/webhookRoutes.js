// routes/webhookRoutes.js
const express = require("express");
const Ticket = require("../models/ticketModel");
const router = express.Router();

router.post("/ticket-done", async (req, res, next) => {
  try {
    if (req.headers["x-secret"] !== process.env.WEBHOOK_SECRET) {
      return res.status(403).send("Invalid secret");
    }

    const { ticketId } = req.body;
    await Ticket.findByIdAndUpdate(ticketId, { status: "done" });

    res.json({ message: "Ticket updated" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
