const Joi = require('@hapi/joi');

function validation(req, res, next) {
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(128)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,128}$/)
      .required(),
    department: Joi.string()
      .min(3)
      .max(128)
  });

  const user = Joi.validate(req.body, schema, (e, result) => {
    if (e) {
      res
        .status(400)
        .json({message: 'Please Provide a username and password.'});
    } else {
      next();
    }
  });
}

module.exports = validation;
