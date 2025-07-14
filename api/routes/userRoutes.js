const express = require('express');
const router = express.Router();

const { getUsers } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const { restictTo, restrictTo } = require("../middleware/roleMiddleware");

router.get('/', verifyToken, restrictTo("Admin"), getUsers);


module.exports = router;
