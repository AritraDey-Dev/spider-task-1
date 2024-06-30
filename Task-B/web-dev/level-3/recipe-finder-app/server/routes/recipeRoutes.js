const express = require('express');
const router = express.Router();

// Example route definition
router.get('/recipes', (req, res) => {
    res.send('This is the recipes endpoint');
});

module.exports = router;
