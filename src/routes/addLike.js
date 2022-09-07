const router = require('express').Router();

const { addLike } = require('../controllers');
const { checkUser } = require('../controllers/middlewares');

router.post('/like', checkUser, addLike);

module.exports = router;
