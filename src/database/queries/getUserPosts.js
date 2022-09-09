const connection = require('../config/connection');

const getUserPosts = (userId) => connection.query('select posts.id as post_id,posts.user_id, posts.content, posts.title, posts.img, sum(votes.voteval) as sum,users.username, users.img as user_img from posts join users on users.id = posts.user_id left join votes on posts.id = votes.post_id where users.id = $1 group by (posts.id, users.id) order by posts.created_date desc;', [userId]);

module.exports = getUserPosts;
