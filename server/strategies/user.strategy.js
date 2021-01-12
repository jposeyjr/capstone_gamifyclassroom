const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  console.log('user.id in serial', user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('id from deserial', id);
  pool
    .query('SELECT id, email, password FROM person WHERE id = $1', [id])
    .then((result) => {
      // Handle Errors
      const user = result && result.rows && result.rows[0];
      console.log('user result', user);
      if (user) {
        // user found
        delete user.password; // remove password so it doesn't get sent
        // done takes an error (null in this case) and a user
        done(null, user);
      } else {
        // user not found
        // done takes an error (null in this case) and a user (also null in this case)
        // this will result in the server returning a 401 status code
        done(null, null);
      }
    })
    .catch((error) => {
      console.log('Error with query during deserializing user ', error);
      // done takes an error (we have one) and a user (null in this case)
      // this will result in the server returning a 500 status code
      done(error, null);
    });
});

// Does actual work of logging in
passport.use(
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
          console.log('local', user);
          if (user && encryptLib.comparePassword(password, user.password)) {
            // All good! Passwords match!
            // done takes an error (null in this case) and a user
            done(null, user);
          } else {
            // Not good! Username and password do not match.
            // done takes an error (null in this case) and a user (also null in this case)
            // this will result in the server returning a 401 status code
            done(null, null);
          }
        })
        .catch((error) => {
          console.log('Error with query for user ', error);
          // done takes an error (we have one) and a user (null in this case)
          // this will result in the server returning a 500 status code
          done(error, null);
        });
    }
  )
);

module.exports = passport;
