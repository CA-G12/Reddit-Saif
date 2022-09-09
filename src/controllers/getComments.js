const { getCommentsQuery } = require('../database/queries');

const getComments = (req, res) => {
  getCommentsQuery()
    .then((data) => res.send({ msg: data.rows, statusCode: 200 }))
    .catch((err) => {
      res.send({
        msg: err.message || 'Internal server error',
        statusCode: err.status || 500,
      });
    });
};
module.exports = getComments;
