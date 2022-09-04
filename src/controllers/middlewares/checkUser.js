const { verifyToken } = require('../../utils');

const checkUser = (req, res, next) => {
  verifyToken(req.cookies)
    .then((decoded) => {
      req.userData = decoded;
      next();
    })
    .catch((err) => {
      res.send({
        msg: 'You are not verified',
        statusCode: 400,
      });
    });
};
module.exports = checkUser;
