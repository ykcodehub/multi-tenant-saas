const express = require("express");
const Ticket = require("../models/ticketModel");
const router = express.Router();

router.post("/webhook/ticket-done", async (req, res, next) => {
  const secret = req.headers["shared-secret"];
  if (secret !== process.env.WEBHOOK_SECRET) return res.status(403).json({ error: "Invalid secret" });

  try {
    const { ticketId } = req.body;
    await Ticket.findByIdAndUpdate(ticketId, { status: "done" });
    res.json({ message: "Ticket updated" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
