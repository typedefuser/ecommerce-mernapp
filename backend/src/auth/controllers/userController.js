const User = require('../model/User');
const utils=require('../utils/userUtil');



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * 
 * @param {jsonbody} req 
 * @param {jsonbody} res 
 * @returns 
 */
exports.createUser = async (req, res) => {
  const { username, name, email, age, password } = req.body;

  try {
    const conflictMessage = await utils.isSignupConflict(username, email);
    if (conflictMessage) {
      return res.status(409).json({ message: conflictMessage });
    }

    const hashedPassword = await utils.hashPassword(password);

    const user = new User({
      username,
      name,
      email,
      age,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Implement getUser, updateUser, and deleteUser methods here...