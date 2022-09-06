const { verify } = require('jsonwebtoken');

const verifyToken = (token) => new Promise((resolve, reject) => {
  verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      reject(err);
    } else {
      resolve(decoded);
    }
  });
});

module.exports = verifyToken;
