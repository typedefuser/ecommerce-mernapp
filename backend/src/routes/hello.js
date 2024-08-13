const express = require('express');
const router = express.Router();
const authenticateToken = require('./../auth/middleware/authMiddleware');

router.get('/hello', authenticateToken, (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = router;
