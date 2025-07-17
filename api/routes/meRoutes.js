const express = require('express');
const router = express.Router();
const { getScreensForTenant } = require('../controllers/meController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/screens', verifyToken, getScreensForTenant);

module.exports = router;
