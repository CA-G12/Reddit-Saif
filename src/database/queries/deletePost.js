const connection = require("../config/connection")

const deletePost = (postId) => connection.query('delete from posts where id = $1', [postId]);

module.exports = deletePost;
