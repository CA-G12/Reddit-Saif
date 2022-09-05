const { CustomError } = require('../../Errors');
const { verifyToken } = require('../../utils');

const checkUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new CustomError('Un authorized', 400);
  verifyToken(token)
    .then((decoded) => {
      req.userData = decoded;
      next();
    })
    .catch((err) => {
      res.send({
        msg: err.message || 'You are not verified',
        statusCode: err.status || 400,
      });
    });
};
module.exports = checkUser;
