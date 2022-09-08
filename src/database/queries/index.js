const addUserQuery = require('./addUser');
const getUserQuery = require('./getUser');
const getUserByEmailQuery = require('./getUserByEmail');
const addPostQuery = require('./addPost');
const getPostsQuery = require('./getPosts');
const addLikeQuery = require('./addLike');
const getUserLikesQuery = require('./getUserLikes');

module.exports = {
  addUserQuery, getUserQuery, getUserByEmailQuery, addPostQuery, getPostsQuery, addLikeQuery, getUserLikesQuery
};
