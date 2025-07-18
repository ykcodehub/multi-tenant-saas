const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Enhanced with error handling and security
exports.register = async (req, res, next) => {
  try {
    const { email, password, customerId, role = 'user' } = req.body; // Default role

    // Validation
    if (!email || !password || !customerId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 12); // Increased salt rounds
    const user = new User({ email, password: hashed, customerId, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Token with expiration (1 hour)
    const token = jwt.sign(
      {
        userId: user._id,
        customerId: user.customerId,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Secure response - remove sensitive data
    const userData = {
      userId: user._id,
      customerId: user.customerId,
      role: user.role,
      email: user.email
    };

    res.json({ 
      token, 
      user: userData,
      expiresIn: 3600 // 1 hour in seconds
    });
  } catch (err) {
    next(err);
  }
};
