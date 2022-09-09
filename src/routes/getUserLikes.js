const router = require('express').Router();
const { getUserLikes } = require('../controllers');
const { checkUser } = require('../controllers/middlewares');

router.get('/userLikes', checkUser, getUserLikes);

module.exports = router;

