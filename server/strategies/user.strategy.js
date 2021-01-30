const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

/** Does the work to see if user can login or not
 * @param {String} id email from the login field
 * @param {Function} done checks to see if username matches or not
 * @event delete makes sure we remove the password so we don't send it for others to capture
 * @event done (null, user) user found , (null, null) no user found, (error, null) error happened
 * */
passport.deserializeUser((id, done) => {
  pool
    .query(
      'SELECT id, first_name, email, role_id, school, password FROM person WHERE id = $1',
      [id]
    )
    .then((result) => {
      const user = result && result.rows && result.rows[0];
      if (user) {
        delete user.password;
        done(null, user);
      } else {
        done(null, null);
      }
    })
    .catch((error) => {
      console.log('Error with query during deserializing user ', error);
      done(error, null);
    });
});

/** Does the work to see if user can login or not
 * @param {String} username username from the login field
 * @param {String} password password from the login field
 * @param {Function} done checks to see if password and username matches or not
 * @event done (null, user) all good passwords match , (null, null) not good they don't match, (error, null) error happened
 * */

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function (username, password, done) {
      pool
        .query('SELECT id, email, password FROM person WHERE email = $1', [
          username,
        ])
        .then((result) => {
          const user = result && result.rows && result.rows[0];
          if (user && encryptLib.comparePassword(password, user.password)) {
            done(null, user);
          } else {
            done(null, null);
          }
        })
        .catch((error) => {
          console.log('Error with query for user ', error);
          done(error, null);
        });
    }
  )
);

module.exports = passport;
