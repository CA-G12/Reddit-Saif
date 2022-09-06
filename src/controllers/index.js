const { signIn, signUp } = require('./auth');
const getPosts = require('./getPosts');
const addPost = require('./addPost');

module.exports = {
  signIn, signUp, getPosts, addPost,
};
