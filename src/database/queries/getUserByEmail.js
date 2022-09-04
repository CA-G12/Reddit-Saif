const connection = require('../config/connection');

const getUserByEmail = (email) => connection.query('select * from users where email = $1;', [email]);

module.exports = getUserByEmail;
