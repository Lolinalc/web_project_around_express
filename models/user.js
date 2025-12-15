const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        const urlRegex =
          /^https?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?%#[\]@!$&'()*+,;=]+#?$/;
        return urlRegex.test(value);
      },
      message:
        "El avatar debe ser una URL válida que comience con http:// o https://",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Email inválido",
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // No devolver la contraseña por defecto
  },
});

module.exports = mongoose.model("user", userSchema);
