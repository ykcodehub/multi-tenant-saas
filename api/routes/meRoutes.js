const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    res.status(200).json({
      userId: req.user.userId,
      role: req.user.role,
      customerId: req.user.customerId
    });
  } catch (error) {
    console.error('Error in /me route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
