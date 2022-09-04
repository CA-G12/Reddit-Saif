const { Pool } = require('pg');
// require('env2')('.env');
require('dotenv').config();

const {
  NODE_ENV, DEV_BD_URL, DATABASE_URL, TEST_DB_URL,
} = process.env;

let connectionString = '';
if (NODE_ENV === 'production') {
  connectionString = DATABASE_URL;
} else if (NODE_ENV === 'development') {
  connectionString = DEV_BD_URL;
} else if (NODE_ENV === 'test') {
  connectionString = TEST_DB_URL;
}

const connection = new Pool({
  connectionString,
  ssl: NODE_ENV !== 'production' ? false : {
    rejectUnauthorized: false,
    // allows heroku receives requests from general users
  },
});

module.exports = connection;
