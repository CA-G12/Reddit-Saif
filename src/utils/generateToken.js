const { sign } = require('jsonwebtoken');

const generateToken = (payload) => new Promise((resolve, reject) => {
  sign(payload, process.env.SECRET_TOKEN, (err, token) => {
    if (err) {
      reject(err);
    } else {
      resolve(token);
    }
  });
});

module.exports = generateToken;
