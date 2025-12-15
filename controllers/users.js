const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

const { JWT_SECRET = "default-dev-secret" } = process.env;

// Crear nuevo usuario
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  // Hashear la contraseña
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash, // Guardamos el hash
      })
    )
    .then((user) => {
      // No devolvemos la contraseña
      res.status(201).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      console.log("ERROR EN SIGNUP:", err); // ← AGREGA ESTA LÍNEA

      if (err.code === 11000) {
        next(new ConflictError("El email ya está registrado"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Datos inválidos"));
      } else {
        next(err);
      }
    });
};

// Login de usuario
const login = (req, res, next) => {
  const { email, password } = req.body;

  // Buscamos el usuario incluyendo la contraseña
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      // Verificar si el usuario existe
      if (!user) {
        throw new UnauthorizedError("Email o contraseña incorrectos");
      }

      // Comparar contraseñas
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Email o contraseña incorrectos");
        }

        // Generar token JWT
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        // Enviar token
        res.send({ token });
      });
    })
    .catch(next);
};

// Actualizar perfil de usuario
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Datos de entrada inválidos"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Usuario no encontrado"));
      } else {
        next(err);
      }
    });
};

// Actualizar avatar de usuario
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Datos de entrada inválidos"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Usuario no encontrado"));
      } else {
        next(err);
      }
    });
};

// Obtener todos los usuarios
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch(next);
};

// Obtener usuario por ID
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Usuario no encontrado"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("ID de usuario inválido"));
      } else {
        next(err);
      }
    });
};

// Obtener usuario actual (el que está logueado)
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuario no encontrado");
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
