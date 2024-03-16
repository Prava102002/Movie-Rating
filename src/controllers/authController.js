const authService = require('../services/authService');

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const result = await authService.registerUser(username, email, password);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    if (result.token) {
      console.log('User successfully logged in');
    }
    res.status(result.status).json({ message: result.message, token: result.token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  register,
  login,
};
