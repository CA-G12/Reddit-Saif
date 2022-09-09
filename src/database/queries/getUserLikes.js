const connection = require('../config/connection');

const getUserLikes = (userId) => connection.query('select * from votes where user_id = $1', [userId]);

module.exports = getUserLikes;
