const connection = require('../config/connection');

const addLike = (data) => connection.query('insert into votes (user_id, post_id, voteVal) values ($1, $2, $3);', [data.user_id, data.post_id, data.voteVal]);

module.exports = addLike;
