const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

/**
 * GET ROUTE
 * Handles Ajax request for user information if user is authenticated
 * Sends back user object from the session
 * */
router.get('/', rejectUnauthenticated, (req, res) => {
  res.send(req.user);
});

/**
 * POST ROUTE
 * Handles a request for new user data and encrypts the password before sending it to the DB
 * Sends back new users ID
 * */

router.post('/register', (req, res, next) => {
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;

  const queryText = `INSERT INTO person (email, password, first_name, last_name, role_id, school)
    VALUES ($1, $2, $3, $4, 2, 1) RETURNING id`;
  pool
    .query(queryText, [email, password, firstName, lastName])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

/**
 * POST ROUTE
 * Handles login form authenticate/login POST
 * uses userStrategy.local as middleware that we will our POST if successful or 404 if not
 * */
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
