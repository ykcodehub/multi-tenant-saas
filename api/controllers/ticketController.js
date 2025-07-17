const Ticket = require("../models/ticketModel");
const { v4: uuidv4 } = require("uuid");

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ customerId: req.user.customerId });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, customerId: req.user.customerId });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch ticket" });
  }
};

exports.createTicket = async (req, res) => {
  const { subject, description, status } = req.body;
  try {
    const ticket = new Ticket({
      subject,
      description,
      status,
      createdBy: req.user.userId,
      customerId: req.user.customerId,
      ticketId: uuidv4()
    });
    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: "Failed to create ticket" });
  }
};

exports.updateTicket = async (req, res) => {
  const { subject, description, status } = req.body;
  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, customerId: req.user.customerId },
      { subject, description, status },
      { new: true }
    );
    if (!updatedTicket) return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: "Failed to update ticket" });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const deleted = await Ticket.findOneAndDelete({
      _id: req.params.id,
      customerId: req.user.customerId
    });
    if (!deleted) return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete ticket" });
  }
};
