// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cookieSession = require('cookie-session');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const PORT = process.env.PORT || 8080;
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'TOKEN_SECRET';
const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(jsonParser);
app.use(limiter);
app.use(cookieSession({
  name: 'session',
  keys: [process.env.TOKEN_SECRET],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Separated Routes for each Resource
const userApiRoutes = require('./routes/users-api');
const noteApiRoutes = require('./routes/notes-api');

// Mount all resource routes
app.use('/api', userApiRoutes);
app.use('/api', noteApiRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
