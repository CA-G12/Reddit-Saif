const joi = require('joi');

const signUpValidate = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).email().required(),
    password: joi.string().min(6).required(),
    username: joi.string().min(2).required(),
    img: joi.string().min(6).required(),
  });

  return schema.validateAsync(data);
};

module.exports = signUpValidate;
