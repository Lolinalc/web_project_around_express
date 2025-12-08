const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

// Función de validación personalizada para URLs
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Validación para registro de usuario
const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// Validación para login
const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Validación para actualizar perfil
const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

// Validación para actualizar avatar
const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

// Validación para obtener usuario por ID
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

// Validación para crear tarjeta
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateURL),
  }),
});

// Validación para operaciones con tarjetas (delete, like, dislike)
const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateUserId,
  validateCreateCard,
  validateCardId,
};
