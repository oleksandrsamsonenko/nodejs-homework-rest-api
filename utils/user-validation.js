const HttpError = require("../helpers/HttpError");
const { userSchema } = require("../schemas/users-schemas");

const userValidateBody = () => {
  const func = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = userValidateBody;
