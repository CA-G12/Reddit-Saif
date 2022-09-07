const connection = require('../config/connection');

const getPosts = () => connection.query('select posts.id as post_id,posts.user_id, posts.content, posts.title, posts.img, count(votes.post_id), users.username, users.img as user_img from posts join users on users.id = posts.user_id left join votes on posts.id = votes.post_id group by (posts.id, users.id) order by count desc;');

module.exports = getPosts;
