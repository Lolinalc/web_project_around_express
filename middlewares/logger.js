const winston = require("winston");
const expressWinston = require("express-winston");

// Logger para solicitudes (request.log)
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
});

// Logger para errores (error.log)
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
