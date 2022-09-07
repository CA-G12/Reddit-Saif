const { CustomError } = require('../../Errors');
const { verifyToken } = require('../../utils');

const checkUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.send({
      msg: 'Un Authorized',
      statusCode: 400,
    });
  }
  verifyToken(token)
    .then((decoded) => {
      req.userData = decoded;
      next();
    })
    .catch((err) => {
      if (err.name === 'JsonWebTokenError') {
        return res.send({
          msg: 'Un Authorized',
          statusCode: 400,
        });
      }
      return res.send({
        msg: err.message || 'You are not verified',
        statusCode: err.status || 400,
      });
    });
};
module.exports = checkUser;
