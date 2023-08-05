const express = require('express');
const bcrypt = require('bcryptjs');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const { 
  generateAccessToken, 
  isAlphanumeric, 
  hasWhitespace 
} = require('../helpers/helpers');

// create a new user
router.post('/auth/signup', (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  
  if (!(username && isAlphanumeric(username))) {
    return res.status(400).send('Username must be alphanumeric.\n');
  }

  if (!password) {
    return res.status(400).send('Password cannot be empty.\n');
  }

  if (hasWhitespace(password)) {
    return res.status(400).send('Password cannot contain spaces.\n');
  }

  userQueries.getUserByUsername(username)
    .then(user => {
      if (!user) {
          const encryptedPassword = bcrypt.hashSync(password, 10);
          userQueries.createUser(username, encryptedPassword)
            .then(user => {
              return res.status(200).send(user);
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
        } else {
          return res.status(409).send('Username is already taken.\n');
        }
      })
});

// login as existing user
router.post('/auth/login', (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  userQueries.getUserByUsername(username)
    .then(user => {
      if (!user) {
        return res.status(400).send('User does not exist. Please register.\n');
      }
     
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(403).send('Incorrect Username or Password\n');
      }

      const token = generateAccessToken(username);
      req.session.token = token;
      req.session.username = username;
      return res.status(200).json(token);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST logout
router.post("/logout", (req, res) => {
  req.session = null;
  return res.status(200).send('Successfully logged out.\n');
});

module.exports = router;
