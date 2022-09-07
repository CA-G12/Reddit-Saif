const { signIn, signUp } = require('./auth');
const getPosts = require('./getPosts');
const addPost = require('./addPost');
const home = require('./home');
const addLike = require('./addLike');

module.exports = {
  signIn, signUp, getPosts, addPost, home, addLike,
};
