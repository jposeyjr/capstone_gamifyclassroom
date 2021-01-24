const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10; // This determines how secure the salt should be

/** Salts and hashes the password
 * @param {String} password plain string that will be salted and hashed for security
 * @event bcrypt.genSaltSync generates a random salt
 * @event bcrypt.hashSync hashes the user password and the salt  and that will get stored in the DB not the true password
 * */
const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  return bcrypt.hashSync(password, salt);
};

/** Does the work to see if the password matches the storedpassword
 * @param {String} candidatePassword what the users enters
 * @param {String} storedPassword checks to see if it matches the original salt and hash that is in the db
 * @event compareSync bcrpyt does the heavy lifting here to accomplish the above
 * */
const comparePassword = (candidatePassword, storedPassword) => {
  return bcrypt.compareSync(candidatePassword, storedPassword);
};

module.exports = {
  encryptPassword,
  comparePassword,
};
