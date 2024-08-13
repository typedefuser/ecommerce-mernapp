const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const utils = require('../utils/userUtil');

const secret = process.env.JWT_SECRET || '*())()&^%^%#VFSV&576*'; 

exports.login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        
        const user = await utils.findUserByCredentials(usernameOrEmail);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
    
        res.status(500).json({ message: 'An error occurred', error: err.message });
    }
};
