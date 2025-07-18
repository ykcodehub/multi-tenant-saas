const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
  res.status(200).json({ message: "List of all users" });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ customerId: req.user.customerId }); 
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching users" });
  }
};
