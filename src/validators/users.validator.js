const Users = require('../models/users.model.js');

async function validateUser(email) {
  try {
    if (await Users.findOne({ email })) {
      return true;
    }

    return false;
  } catch (err) {
    return err.message;
  }
}

module.exports = { validateUser };
