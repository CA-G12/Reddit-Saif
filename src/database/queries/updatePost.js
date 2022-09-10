const connection = require('../config/connection');

const updatePost = (post) => connection.query('UPDATE posts SET title = $1, content = $2, img = $3 where id = $4 returning *;', [post.title, post.content, post.img, post.id]);

module.exports = updatePost;
