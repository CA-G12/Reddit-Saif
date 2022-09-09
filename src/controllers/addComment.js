const { addCommentQuery } = require('../database/queries');
const { commentValidate } = require('../validation');

const addComment = (req, res) => {
  commentValidate({ content: req.body.commentText })
    .then(() => addCommentQuery({
      postId: req.body.postId,
      userId: req.userData.id,
      content: req.body.commentText,
    }))
    .then((data) => res.send({ msg: 'Comments is added successfully', statusCode: 200 }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          msg: err.message,
          statusCode: 400,
        });
      }
      return res.status(err.status || 500).send({
        msg: err.message || 'Internal Server Error',
        statusCode: err.status || 500,
      });
    });
};
module.exports = addComment;
