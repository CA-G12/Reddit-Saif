const connection = require('../config/connection');

const addUser = (user) => connection.query(
  'insert into users (username, email, password, img) values ($1, $2, $3, $4) returning *;',
  [user.username, user.email, user.password, user.img],
);
module.exports = addUser;
