const Joi = require("joi");

const postValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `missing required name field` }),
  email: Joi.string()
    .required()
    .messages({ "any.required": `missing required email field` }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": `missing required phone field` }),
});

const putValidationSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).options({ allowUnknown: false });

module.exports = {
  postValidationSchema,
  putValidationSchema,
};
