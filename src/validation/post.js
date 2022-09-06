const joi = require('joi');

const postValidate = (data) => {
  const schema = joi.object({
    title: joi.string().required(),
    content: joi.string().min(6).required(),
    img: joi.string().min(4).required(),
    user_id: joi.number().required(),
  });

  return schema.validateAsync(data);
};

module.exports = postValidate;
