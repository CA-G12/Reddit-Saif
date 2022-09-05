const { addPostQuery } = require('../database/queries');
const { postValidate } = require('../validation');

const addPost = (req, res) => {
  postValidate({ ...req.body, user_id: req.userData.id })
    .then((validatedData) => addPostQuery(validatedData))
    .then((data) => {
      res.send({ msg: 'Post added successfully', statusCode: 200 });
    }).catch((err) => {
      res.send({
        msg: err.message || 'Internal server error',
        statusCode: err.status || 500,
      });
    });
};
module.exports = addPost;
