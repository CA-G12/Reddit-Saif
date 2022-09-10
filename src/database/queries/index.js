const addUserQuery = require('./addUser');
const getUserQuery = require('./getUser');
const getUserByEmailQuery = require('./getUserByEmail');
const addPostQuery = require('./addPost');
const getPostsQuery = require('./getPosts');
const addLikeQuery = require('./addLike');
const getUserLikesQuery = require('./getUserLikes');
const getCommentsQuery = require('./getComments');
const addCommentQuery = require('./addComment');
const getUserPostsQuery = require('./getUserPosts');
const getUserInfoQuery = require('./getUserInfo');
const deletePostQuery = require('./deletePost');
const updatePostQuery = require('./updatePost');

module.exports = {
  addUserQuery,
  getUserQuery,
  getUserByEmailQuery,
  addPostQuery,
  getPostsQuery,
  addLikeQuery,
  getUserLikesQuery,
  getCommentsQuery,
  addCommentQuery,
  getUserPostsQuery,
  getUserInfoQuery,
  deletePostQuery,
  updatePostQuery,
};
