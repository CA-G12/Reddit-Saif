const { getUserPostsQuery } = require('../database/queries');

const getUserPosts = (req, res) => {
  getUserPostsQuery(req.userData.id) 
    .then((data) => res.send({ msg: data.rows, statusCode: 200 }))
    .catch((err) => {
      res.send({
        msg: err.message || 'Internal server error',
        statusCode: err.status || 500,
      });
    });
};

module.exports = getUserPosts;
