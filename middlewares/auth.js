const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

const { JWT_SECRET = "default-dev-secret" } = process.env;

const auth = (req, res, next) => {
  // Obtener el token del header Authorization
  const { authorization } = req.headers;

  // Verificar que existe el header
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Autorización requerida");
  }

  // Extraer el token (quitar "Bearer ")
  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    // Verificar el token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError("Token inválido o expirado");
  }

  // Guardar el payload en req.user
  req.user = payload;

  next(); // Continuar con la siguiente función
};

module.exports = auth;
