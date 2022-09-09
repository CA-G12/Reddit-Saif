const connection = require('../config/connection');

const getPosts = () => connection.query('select posts.id as post_id,posts.user_id, posts.content, posts.title, posts.img, sum(votes.voteval) as sum, users.username, users.img as user_img from posts join users on users.id = posts.user_id left join votes on posts.id = votes.post_id group by (posts.id, users.id);');

module.exports = getPosts;

// select posts.id as post_id,posts.user_id, posts.content, posts.title, posts.img, sum(votes.voteval) as sum, users.username, users.img as user_img, comments.content as comment from posts join users on users.id = posts.user_id left join votes on posts.id = votes.post_id left join comments on posts.id = comments.post_id group by (posts.id, users.id,comments.id);

// select posts.id as post_id,posts.user_id, posts.content, posts.title, posts.img, sum(votes.voteval) as sum, users.username, users.img as user_img, json_agg(comments.*) from posts join users on users.id = posts.user_id left join votes on posts.id = votes.post_id left join comments on posts.id = comments.post_id group by (posts.id, users.id,comments.id);

// select json_agg((comments.*,users.img, users.username)) from users left join comments on users.id = comments.user_id ;

// select json_agg(json_build_object('comments_id', comments.id,'comment_content',comments.content, 'user_img', users.img, 'username' , users.username)) from users left join comments on users.id = comments.user_id ;

// select json_agg(json_build_object('comments_id', comments.id,'comment_content',comments.content,'user_id',users.id,'post_id',comments.id, 'user_img', users.img, 'username' , users.username)) from users left join comments on users.id = comments.user_id ;

// select posts.id as post_id,posts.user_id, posts.content, posts.title, posts.img, sum(votes.voteval) as sum, users.username, users.img as user_img, json_agg(json_build_object('comments_id', comments.id,'comment_content',comments.content,'user_id',users.id,'post_id',comments.id, 'user_img', users.img, 'username' , users.username)) from posts join users on users.id = posts.user_id left join votes on posts.id = votes.post_id left join comments on posts.id = comments.post_id group by (posts.id, users.id,comments.id);

// select posts.id as post_id,posts.user_id, posts.content, posts.title, posts.img, sum(votes.voteval) as sum, users.username, users.img as user_img, 
// json_agg(json_build_object('comments_id', comments.id,'comment_content',comments.content,'user_id',users.id,'post_id',posts.id, 'user_img', users.img, 'username' , users.username )) 
// from posts join users on users.id = posts.user_id left join votes on posts.id = votes.post_id left join comments on posts.id = comments.post_id group by (posts.id, users.id);
