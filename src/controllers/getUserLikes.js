const { getUserLikesQuery } = require('../database/queries');

const getUserLikes = (req, res) => {
  getUserLikesQuery(req.userData.id)
    .then((data) => res.send({
      msg: data.rows,
      statusCode: 200,
    }))
    .catch((err) => {
      res.send({
        msg: err.message || 'Internal Server Error',
        statusCode: err.status || 500,
      });
    });
};
module.exports = getUserLikes;
