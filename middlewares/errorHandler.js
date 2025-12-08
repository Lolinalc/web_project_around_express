// middleware de manejo centralizado de errores
const errorHandler = (err, req, res, next) => {
  // Si el error ya tiene un statusCode, lo usamos
  const statusCode = err.statusCode || 500;

  // Mensaje por defecto para errores 500
  const message =
    statusCode === 500 ? "Ocurrió un error en el servidor" : err.message;

  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;
