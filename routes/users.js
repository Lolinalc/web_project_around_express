const router = require("express").Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");
const {
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require("../middlewares/validations");

// Todas estas rutas están protegidas por el middleware de autenticación
router.get("/me", getCurrentUser);
router.get("/", getUsers);
router.get("/:userId", validateUserId, getUserById);
router.patch("/me", validateUpdateProfile, updateProfile);
router.patch("/me/avatar", validateUpdateAvatar, updateAvatar);

module.exports = router;
