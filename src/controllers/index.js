const { signIn, signUp } = require('./auth');
const getPosts = require('./getPosts');
const addPost = require('./addPost');
const home = require('./home');
const addLike = require('./addLike');
const getUserLikes = require('./getUserLikes');
const getComments = require('./getComments');
const addComment = require('./addComment');
const getUserPosts = require('./getUserPosts');
const getUserInfo = require('./getUserInfo');
const deletePost = require('./deletePost');
const updatePost = require('./updatePost');

module.exports = {
  signIn,
  signUp,
  getPosts,
  addPost,
  home,
  addLike,
  getUserLikes,
  getComments,
  addComment,
  getUserPosts,
  getUserInfo,
  deletePost,
  updatePost,
};
