const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Users endpoint is working');
});

module.exports = router;
