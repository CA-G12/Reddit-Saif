const router = require('express').Router();
const { deletePost } = require('../controllers');
const { checkUser } = require('../controllers/middlewares');

router.delete('/post/:id', checkUser, deletePost);

module.exports = router;
