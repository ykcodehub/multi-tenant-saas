const registry = require('../data/registry.json');

exports.getScreensForTenant = (req, res) => {
    const customerId = req.user.customerId;

    const screens = registry[customerId];
    if (!screens) {
        return res.status(404).json({ message: "No screens configured for this tenant" });
    }

    res.json({ screens });
};
