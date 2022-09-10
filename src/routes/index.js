const router = require('express').Router();
const { signInRouter, signUpRouter } = require('./auth');
const getPostsRouter = require('./getPosts');
const addPostRouter = require('./addPost');
const addLikeRouter = require('./addLike');
const getUserLikesRouter = require('./getUserLikes');
const getCommentsRouter = require('./getComments');
const addCommentRouter = require('./addComment');
const getUserPostsRouter = require('./getUserPosts');
const getUserInfoRouter = require('./getUserInfo');
const deletePostRouter = require('./deletePost');

router.use(signInRouter);
router.use(signUpRouter);
router.use(getPostsRouter);
router.use(addPostRouter);
router.use(addLikeRouter);
router.use(getUserLikesRouter);
router.use(getCommentsRouter);
router.use(addCommentRouter);
router.use(getUserPostsRouter);
router.use(getUserInfoRouter);
router.use(deletePostRouter);
module.exports = router;
