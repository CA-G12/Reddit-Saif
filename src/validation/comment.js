const joi = require('joi');

const commentValidate = (data) => {
  const schema = joi.object({
    content: joi.string().required(),
  });
  return schema.validateAsync(data);
};

module.exports = commentValidate;
