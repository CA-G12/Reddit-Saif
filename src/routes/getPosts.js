const router = require('express').Router();
const { getPosts } = require('../controllers');

router.get('/posts', getPosts);

module.exports = router;
