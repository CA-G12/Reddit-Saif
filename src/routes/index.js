const router = require('express').Router();
const { signInRouter, signUpRouter } = require('./auth');

router.use(signInRouter);
router.use(signUpRouter);

module.exports = router;
