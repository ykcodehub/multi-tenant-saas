const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
} = require('../controllers/ticketController');

router.get('/', verifyToken, getAllTickets);
router.get('/:id', verifyToken, getTicketById);
router.post('/', verifyToken, createTicket);
router.put('/:id', verifyToken, updateTicket);
router.delete('/:id', verifyToken, deleteTicket);

module.exports = router;
