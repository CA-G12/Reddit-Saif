const { hash } = require('bcrypt');
const { generateToken } = require('../../utils');

const { signUpValidate } = require('../../validation');
const { addUserQuery, getUserQuery } = require('../../database/queries');
const { CustomError } = require('../../Errors');

const signUp = (req, res) => {
  signUpValidate(req.body)
    .then((validation) => getUserQuery(validation.email, validation.username))
    .then((userData) => {
      if (userData.rowCount) {
        const { email, username } = userData.rows[0];
        if (email === req.body.email) throw new CustomError('Email already exists', 400);
        if (username === req.body.username) throw new CustomError('Username already exists', 400);
      }

      return hash(req.body.password, 10);
    })
    .then((hashedPassword) => addUserQuery({ ...req.body, password: hashedPassword }))
    .then((userData) => {
      const { username, id } = userData.rows[0];
      return generateToken({ username, id });
    })
    .then((token) => {
      res.cookie('token', token).send({
        msg: 'User added successfully',
        statusCode: 201,
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

module.exports = signUp;
