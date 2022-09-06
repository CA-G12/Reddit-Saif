const router = require('express').Router();
const { signInRouter, signUpRouter } = require('./auth');
const getPostsRouter = require('./getPosts');
const addPostRouter = require('./addPost');

router.use(signInRouter);
router.use(signUpRouter);
router.use(getPostsRouter);
router.use(addPostRouter);

module.exports = router;
