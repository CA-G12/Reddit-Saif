const router = require('express').Router();
const { signInRouter, signUpRouter } = require('./auth');
const getPostsRouter = require('./getPosts');
const addPostRouter = require('./addPost');
const addLikeRouter = require('./addLike');

router.use(signInRouter);
router.use(signUpRouter);
router.use(getPostsRouter);
router.use(addPostRouter);
router.use(addLikeRouter);

module.exports = router;
