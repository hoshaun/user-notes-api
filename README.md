## User Notes API

Backend RESTful API that allow users to create and share notes with other users.
Implemented using Express, NodeJS, PostgreSQL.
Includes JWT token authentication for API endpoints and simple rate limiting using `express-rate-limit` library.

## Creating The DB

Login to PostgreSQL and create a database according to `.env` file information (see setup instructions). Example:

Using terminal, login using `psql -U username` and create a database with the command `CREATE DATABASE user_notes;`.

## Setup

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Generate a new `TOKEN_SECRET` by running `require('crypto').randomBytes(64).toString('hex')` in a terminal and copying the string, or just put any string.
3. Update the .env file with your correct local information (example below)
    ```
    PORT=8080
    TOKEN_SECRET=secret
    DB_HOST=localhost
    DB_USER=username
    DB_PASS=password
    DB_NAME=user_notes
    # Uncomment and set to true for Heroku
    # DB_SSL=true if heroku
    DB_PORT=5432
    ```
4. Install dependencies: `npm i`
5. Run command to initialize or reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
6. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
7. Test various API endpoints using any HTTP client such as Postman or cURL. Mocha/Chai tests can be run using command `npm test` (only tests for user API are currently implemented, tests for notes API are currently incomplete).

## Seeding

- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
