require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { errors } = require("celebrate");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const NotFoundError = require("./errors/NotFoundError");
const { validateSignup, validateSignin } = require("./middlewares/validations");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001, MONGODB_URI = "mongodb://localhost:27017/aroundb" } =
  process.env;
const app = express();

// Conectar a MongoDB
mongoose.connect(MONGODB_URI);

// CORS - Permitir solicitudes del frontend
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Logging de solicitudes
app.use(requestLogger);

// Rutas públicas - NO necesitan autenticación
const { createUser, login } = require("./controllers/users");
app.post("/signup", validateSignup, createUser);
app.post("/signin", validateSignin, login);

// Rutas protegidas - Requieren autenticación
app.use("/users", auth, usersRouter);
app.use("/cards", auth, cardsRouter);

// Servir archivos estáticos del frontend (build de React)
app.use(express.static(path.join(__dirname, "public")));

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  next(new NotFoundError("Recurso no encontrado"));
});

// Logging de errores
app.use(errorLogger);

// Middleware de errores de celebrate
app.use(errors());

// Middleware de manejo centralizado de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
