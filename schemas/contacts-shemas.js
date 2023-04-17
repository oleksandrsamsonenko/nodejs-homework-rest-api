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
  favorite: Joi.boolean(),
});

const putValidationSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).options({ allowUnknown: false });

const favoriteValidationSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  postValidationSchema,
  putValidationSchema,
  favoriteValidationSchema,
};
