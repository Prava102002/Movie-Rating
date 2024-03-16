const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function registerUser(username, email, password) {
  try {
    let user = await User.findOne({ email });
    if (user) {
      return { status: 400, message: 'User already exists' };
    }
    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return { status: 201, message: 'User registered successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function loginUser(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { status: 400, message: 'Invalid credentials' };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 400, message: 'Invalid credentials' };
    }
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' });
    return { status: 200, message: 'Login successful', token };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  registerUser,
  loginUser,
};
