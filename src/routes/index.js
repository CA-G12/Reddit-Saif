const router = require('express').Router();
const { signInRouter, signUpRouter } = require('./auth');
const getPostsRouter = require('./getPosts');
const addPostRouter = require('./addPost');
const addLikeRouter = require('./addLike');
const getUserLikesRouter = require('./getUserLikes');
const getCommentsRouter = require('./getComments');
const addCommentRouter = require('./addComment');

router.use(signInRouter);
router.use(signUpRouter);
router.use(getPostsRouter);
router.use(addPostRouter);
router.use(addLikeRouter);
router.use(getUserLikesRouter);
router.use(getCommentsRouter);
router.use(addCommentRouter);
module.exports = router;
