const router = require('express').Router();
const { updatePost } = require('../controllers');
const { checkUser } = require('../controllers/middlewares');

router.put('/post', checkUser, updatePost);

module.exports = router;