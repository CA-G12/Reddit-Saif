const router = require('express').Router();
const { getUserInfo } = require('../controllers');
const { checkUser } = require('../controllers/middlewares');

router.get('/userInfo', checkUser, getUserInfo);

module.exports = router;
