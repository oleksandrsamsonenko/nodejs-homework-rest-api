const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "wrong email format",
    "any.required": `email is required`,
  }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": `password is required` }),
});

module.exports = {
  userSchema,
};
