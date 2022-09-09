const { addLikeQuery } = require('../database/queries');

const addLike = (req, res) => {
  addLikeQuery({ user_id: req.userData.id, post_id: req.body.postId, voteVal: req.body.likeNum })
    .then((data) => {
      res.send({ msg: 'Done', statusCode: 200 });
    })
    .catch((err) => {
      // console.log('error', err);
      res.send({
        msg: err.message,
        statusCode: 400,
      })
    });
};
module.exports = addLike;
