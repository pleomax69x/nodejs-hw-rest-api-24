const Joi = require("joi");

const schemaUser = Joi.object({
  email: Joi.string().min(5).max(30).required(),
  password: Joi.string().alphanum().min(3).max(30).required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports.validateUser = (req, _res, next) => {
  return validate(schemaUser, req.body, next);
};
