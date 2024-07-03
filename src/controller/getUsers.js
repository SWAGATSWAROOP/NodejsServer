const Auth = require('../models/auth.js'); 

const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {getAllUsers}; 