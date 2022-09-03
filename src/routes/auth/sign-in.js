const router = require('express').Router();

const { signIn } = require('../../controllers');

router.post('/sign-in', signIn);

module.exports = router;
