const { signIn, signUp } = require('./auth');
const getPosts = require('./getPosts');
const addPost = require('./addPost');
const home = require('./home');
const addLike = require('./addLike');
const getUserLikes = require('./getUserLikes');

module.exports = {
  signIn, signUp, getPosts, addPost, home, addLike,getUserLikes
};
