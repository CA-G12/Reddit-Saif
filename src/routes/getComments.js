const router = require('express').Router();
const { getComments } = require('../controllers');

router.get('/comments', getComments);

module.exports = router;
