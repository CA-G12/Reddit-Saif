const connection = require('../config/connection');

const getUser = (email, username) => connection.query('select * from users where email = $1 or username = $2', [email, username]);

module.exports = getUser;
