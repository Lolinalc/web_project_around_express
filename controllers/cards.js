const Card = require("../models/card");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

// Obtener todas las tarjetas
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).json(cards))
    .catch(next);
};

// Crear nueva tarjeta
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Datos de entrada inválidos"));
      } else {
        next(err);
      }
    });
};

// Eliminar tarjeta por ID (solo el dueño)
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      // Verificar que el usuario sea el dueño de la tarjeta
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          "No tienes permiso para eliminar esta tarjeta"
        );
      }

      // Si es el dueño, eliminar
      return Card.findByIdAndDelete(req.params.cardId).then(() =>
        res.status(200).json({ message: "Tarjeta eliminada", card })
      );
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Tarjeta no encontrada"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("ID de tarjeta inválido"));
      } else {
        next(err);
      }
    });
};

// Dar like a una tarjeta
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // agrega _id al array si aún no está ahí
    { new: true }
  )
    .orFail()
    .then((card) => res.status(200).json(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Tarjeta no encontrada"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("ID de tarjeta inválido"));
      } else {
        next(err);
      }
    });
};

// Quitar like de una tarjeta
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.status(200).json(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Tarjeta no encontrada"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("ID de tarjeta inválido"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
