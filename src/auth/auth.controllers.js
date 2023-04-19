const { findUserByEmail } = require("../users/users.controlles");
const { comparePassword } = require("../utils/crypto");

const checkUserCredentials = async (email, password) => {
  // retorna User || false

  const user = await findUserByEmail(email);

  const validatePassword = comparePassword(password, user.password);

  if (!validatePassword) return false;

  return user;

  //return validatePassword ? user : false
};

module.exports = checkUserCredentials;
