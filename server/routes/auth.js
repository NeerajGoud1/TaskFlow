// const express = require('express');
// const {
//   register,
//   login,
//   getMe,
//   updateProfile
// } = require('../controllers/authController');
// const { protect } = require('../middleware/auth');
// const {
//   validateUser,
//   validateLogin,
//   handleValidationErrors
// } = require('../middleware/validation');

// const router = express.Router();

// router.post('/register', validateUser, handleValidationErrors, register);
// router.post('/login', validateLogin, handleValidationErrors, login);
// router.get('/me', protect, getMe);
// router.put('/profile', protect, validateUser, handleValidationErrors, updateProfile);

// module.exports = router;

// routes/auth.js
const express = require("express");
const {
  register,
  login,
  getMe,
  updateProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
} = require("../middleware/validation");

const router = express.Router();

// Register (required fields)
router.post("/register", validateRegister, register);

// Login
router.post("/login", validateLogin, login);

// Get current user
router.get("/me", protect, getMe);

// Update profile (all fields optional; validates only when present)
router.put("/profile", protect, validateUpdateProfile, updateProfile);

module.exports = router;
