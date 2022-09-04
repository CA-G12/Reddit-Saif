const router = require('express').Router();
const { addPost } = require('../controllers');
const { checkUser } = require('../controllers/middlewares');

router.post('/post', checkUser, addPost);

module.exports = router;
