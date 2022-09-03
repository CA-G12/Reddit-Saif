const joi = require('joi');

const signInValidate = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).email().required(),
    password: joi.string().min(6).required(),
  });

  return schema.validateAsync(data);
};

module.exports = signInValidate;
