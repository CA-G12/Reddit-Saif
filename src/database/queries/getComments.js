const connection = require('../config/connection');

const getComments = () => connection.query('SELECT comments.*,users.username,users.img from comments join users on comments.user_id = users.id;');

module.exports = getComments;
