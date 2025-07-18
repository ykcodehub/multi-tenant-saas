const registry = require('../data/registry.json');

exports.getMe = (req, res) => {
  res.status(200).json({
    userId: req.user.userId,
    role: req.user.role,
    customerId: req.user.customerId
  });
};

exports.getScreens = (req, res) => {
  const { customerId } = req.user;
  const tenantScreens = registry.tenants[customerId]?.screens || [];
  
  res.json({
    success: true,
    screens: tenantScreens.map(screen => ({
      path: screen,
      name: screen.replace('/', '').replace('-', ' ')
    }))
  });
};
