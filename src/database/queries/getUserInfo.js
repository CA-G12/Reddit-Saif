const connection = require('../config/connection');

const getUserInfo = (userId) => connection.query('select id,username,email,img from users where id = $1', [userId]);

module.exports = getUserInfo;
