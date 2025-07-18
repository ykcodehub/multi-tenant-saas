const Ticket = require('../models/ticketModel');

// ✅ GET all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ customerId: req.user.customerId });
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};

// ✅ GET ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      customerId: req.user.customerId,
    });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ message: "Failed to fetch ticket" });
  }
};
// ✅ CREATE a new ticket
exports.createTicket = async (req, res) => {
  try {
    const newTicket = new Ticket({
      ...req.body,
      customerId: req.user.customerId,
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Failed to create ticket" });
  }
};

// ✅ UPDATE a ticket
exports.updateTicket = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, customerId: req.user.customerId },
      req.body,
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: "Failed to update ticket" });
  }
};


exports.deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findOneAndDelete({
      _id: req.params.id,
      customerId: req.user.customerId,
    });

    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ message: "Failed to delete ticket" });
  }
};

