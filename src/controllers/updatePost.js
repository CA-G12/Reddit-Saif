const { updatePostQuery } = require('../database/queries');
const { postValidate } = require('../validation');

const updatePost = (req, res) => {
  const { title, content, img } = req.body;
  postValidate({
    title, content, img, user_id: req.userData.id,
  })
    .then(() => updatePostQuery(req.body))
    .then(() => {
      res.send({ msg: 'Post updated successfully', statusCode: 200 });
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err.message);
        return res.status(400).send({
          msg: err.message,
          statusCode: 400,
        });
      }
      res.send({
        msg: err.message || 'Internal server error',
        statusCode: err.status || 500,
      });
    });
};
module.exports = updatePost;
