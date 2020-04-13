const validateUsername = (username) => {
  // The username
  /* must have
    *   at least 3 characters
    */

  /* can have
    *   letters
    *   numbers
    *   underscores
    */

  /* can not have
    *   two underscores in a row
    *   a underscore at the start or the end
    */

  const usernameRegexp = /^[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/;
  const invalidUsername = !usernameRegexp.test(username) || username.length < 3;

  if (invalidUsername) {
    return false;
  }
  return true;
};

const validatePasswords = (password1, password2) => {
  const invalidPasswordLength = password1.length < 8 || password2.length < 8;
  const differentPasswords = password1 !== password2;

  if (invalidPasswordLength || differentPasswords) {
    return false;
  }

  return true;
};

module.exports = {
  validateUsername,
  validatePasswords,
};
