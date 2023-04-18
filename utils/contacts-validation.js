const {
  putValidationSchema,
  postValidationSchema,
  favoriteValidationSchema,
} = require("../schemas/contacts-shemas");

const HttpError = require("../helpers/HttpError");

const postValidateBody = () => {
  const func = (req, res, next) => {
    const { error } = postValidationSchema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

const putValidateBody = () => {
  const func = (req, res, next) => {
    if (JSON.stringify(req.body) === "{}") {
      throw HttpError(400, "Missing Fields");
    }
    const { error } = putValidationSchema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

const favoriteValidateBody = () => {
  const func = (req, res, next) => {
    if (JSON.stringify(req.body) === "{}") {
      throw HttpError(400, "missing field favorite");
    }
    const { error } = favoriteValidationSchema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = {
  postValidateBody,
  putValidateBody,
  favoriteValidateBody,
};
