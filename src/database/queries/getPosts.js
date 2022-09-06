const connection = require('./../config/connection');

const getPosts = () => connection.query('select * from posts;');

module.exports = getPosts;
