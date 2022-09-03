const router = require('express').Router();

const { signUp } = require('../../controllers');

router.post('/sign-up', signUp);

module.exports = router;
