const Joi = require("joi");

const schemaContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
  favorite: Joi.boolean().optional(),
});

const schemaContactUpdate = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
  favorite: Joi.boolean().optional(),
});

const schemaContactUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    if (schema === schemaContact) {
      next({ status: 400, message: "missing required name field" });
    }
    if (schema === schemaContactUpdate) {
      next({ status: 400, message: "missing fields" });
    }
    if (schema === schemaContactUpdateFavorite) {
      next({ status: 400, message: `missing field favorite` });
    }
    next({ status: 400, message: err.message });
  }
};

module.exports.validateContact = (req, _res, next) => {
  return validate(schemaContact, req.body, next);
};
module.exports.validateContactUpdate = (req, _res, next) => {
  return validate(schemaContactUpdate, req.body, next);
};
module.exports.validateContactUpdateFavorite = (req, _res, next) => {
  return validate(schemaContactUpdateFavorite, req.body, next);
};
