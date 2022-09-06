const connection = require("../config/connection")

const addPost = (post) => connection.query('insert into posts (title, content, img, user_id) values ($1, $2, $3, $4) returning *;', [post.title, post.content, post.img, post.user_id]);

module.exports = addPost;
