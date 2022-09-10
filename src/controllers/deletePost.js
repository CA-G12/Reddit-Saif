const { deletePostQuery } = require('../database/queries');

const deletePost = (req, res) => {
  deletePostQuery(req.params.id)
    .then((data) => {
      res.send({ msg: 'Done', statusCode: 200 });
    })
    .catch((err) => {
      res.send({
        msg: err.message,
        statusCode: 400,
      })
    });
};
module.exports = deletePost;
