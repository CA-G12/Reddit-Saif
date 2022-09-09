const router = require('express').Router();
const { getUserPosts } = require('../controllers');
const { checkUser } = require('../controllers/middlewares');

router.get('/userPosts', checkUser, getUserPosts);

module.exports = router;
