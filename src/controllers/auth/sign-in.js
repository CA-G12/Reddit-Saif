const { compare } = require('bcrypt');
const { signInValidate } = require('../../validation');
const { getUserByEmailQuery } = require('../../database/queries');
const { CustomError } = require('../../Errors');
const { generateToken } = require('../../utils');

const signIn = (req, res) => {
  signInValidate(req.body)
    .then((user) => getUserByEmailQuery(user.email))
    .then((userData) => {
      if (userData.rowCount === 0) throw new CustomError('Email or password is invalid', 400);
      req.user = userData.rows[0];
      return compare(req.body.password, userData.rows[0].password);
    })
    .then((isValid) => {
      if (!isValid) throw new CustomError('Email or password is invalid', 400);

      return generateToken({ id: req.user.id, username: req.user.username });
    })
    .then((token) => {
      res.cookie('token', token).status(200).send({
        username: req.user.username,
        msg: 'Logged successfully',
        statusCode: 200,
      });
    })
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

module.exports = signIn;
