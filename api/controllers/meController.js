exports.getMe = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user info in request' });
  }

  res.status(200).json({
    userId: req.user.userId,
    role: req.user.role,
    customerId: req.user.customerId
  });
};
// support-ticket-app/api/controllers/meController.js
const registry = require('../data/registry.json');

exports.getScreensForTenant = (req, res) => {
  const customerId = req.user.customerId;

  const screens = registry[customerId];
  if (!screens) {
    return res.status(404).json({ message: "No screens configured for this tenant" });
  }

  res.json({ screens });
};
