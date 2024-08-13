const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || '*())()&^%^%#VFSV&576*';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'Token is missing' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
