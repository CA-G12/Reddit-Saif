const connection = require('../config/connection');

const addComment = (comment) => connection.query('insert into comments (post_id, user_id, content) values ($1, $2, $3);',[comment.postId, comment.userId, comment.content]);

module.exports = addComment;
