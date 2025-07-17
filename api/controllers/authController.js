const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async (req, res, next) => {
  try {
    const { email, password, customerId, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashed, customerId, role });
    await user.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({
      userId: user._id,
      customerId: user.customerId,
      role: user.role
    }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { userId: user._id, customerId: user.customerId, role: user.role } });
  } catch (err) {
    next(err);
  }
};
