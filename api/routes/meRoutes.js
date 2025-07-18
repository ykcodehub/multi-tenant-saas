const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const meController = require("../controllers/meController");

// Corrected routes
router.get("/", verifyToken, meController.getMe);
router.get("/screens", verifyToken, meController.getScreens);

module.exports = router;
