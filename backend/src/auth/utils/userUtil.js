const bcrypt=require('bcryptjs');
const User = require('../model/User'); 


exports.isSignupConflict = async (username, email) => {
  const userByUsername = await User.findOne({ username });
  if (userByUsername) return 'Username already exists';

  const userByEmail = await User.findOne({ email });
  if (userByEmail) return 'Email already exists';

  return null; 
};

exports.hashPassword = async (password) => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error('Error hashing password');
    }
  };



/**
 * 
 * @param {string} usernameOrEmail 
 * @returns {User}
 */
exports.findUserByCredentials = async (usernameOrEmail) => {
  try {

    const user = await User.findOne({
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ]
    });
    return user;
  } catch (err) {
    console.error('Error finding user by credentials:', err); 
    throw new Error('Error finding user by credentials: ' + err.message);
  }
};



