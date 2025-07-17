const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");

router.use(verifyToken);
router.use(restrictTo("admin"));

router.get("/dashboard", (req, res) => {
  res.json({ message: "Welcome, Admin! You are inside the protected dashboard." });
});

module.exports = router;
