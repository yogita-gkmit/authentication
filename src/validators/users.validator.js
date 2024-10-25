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

// async function validatePassword(password) {
//   try {
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ message: 'Invalid Password' });
//     }

//     return false;
//   } catch (err) {
//     return err.message;
//   }
// }

module.exports = { validateUser };
