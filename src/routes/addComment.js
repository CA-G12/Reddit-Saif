const router = require('express').Router();
const { addComment } = require('../controllers');
const { checkUser } = require('../controllers/middlewares');

router.post('/comment', checkUser, addComment);

module.exports = router;
