// const { body, validationResult } = require("express-validator");

// // Handle validation errors
// const handleValidationErrors = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       success: false,
//       message: "Validation Error",
//       errors: errors.array(),
//     });
//   }
//   next();
// };

// // User validation rules
// const validateUser = [
//   body("name")
//     .trim()
//     .isLength({ min: 2, max: 50 })
//     .withMessage("Name must be between 2 and 50 characters"),
//   body("email")
//     .isEmail()
//     .normalizeEmail()
//     .withMessage("Please enter a valid email"),
//   body("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters"),
// ];

// const validateLogin = [
//   body("email")
//     .isEmail()
//     .normalizeEmail()
//     .withMessage("Please enter a valid email"),
//   body("password").notEmpty().withMessage("Password is required"),
// ];

// // Task validation rules
// const validateTask = [
//   body("title")
//     .trim()
//     .isLength({ min: 1, max: 100 })
//     .withMessage("Title must be between 1 and 100 characters"),
//   body("description")
//     .optional()
//     .trim()
//     .isLength({ max: 500 })
//     .withMessage("Description cannot exceed 500 characters"),
//   body("status")
//     .optional()
//     .isIn(["pending", "in-progress", "completed"])
//     .withMessage("Status must be pending, in-progress, or completed"),
//   body("priority")
//     .optional()
//     .isIn(["low", "medium", "high"])
//     .withMessage("Priority must be low, medium, or high"),
//   body("category")
//     .optional()
//     .trim()
//     .isLength({ max: 50 })
//     .withMessage("Category cannot exceed 50 characters"),
//   body("dueDate")
//     .optional()
//     .isISO8601()
//     .withMessage("Due date must be a valid date"),
// ];

// module.exports = {
//   handleValidationErrors,
//   validateUser,
//   validateLogin,
//   validateTask,
// };

// middleware/validation.js
const { body, validationResult } = require("express-validator");

/**
 * handleValidationErrors
 * Formats validation errors and returns 422 Unprocessable Entity
 */
const handleValidationErrors = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
      value: err.value,
    }));

    console.log("Validation errors:", formatted);

    return res.status(422).json({
      success: false,
      message: "Validation Error",
      errors: formatted,
    });
  }
  next();
};

const validateRegister = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email")
    .bail()
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const validateLogin = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email")
    .bail()
    .normalizeEmail(),
  body("password").exists().withMessage("Password is required"),
];

const validateUpdateProfile = [
  body("name")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .optional({ nullable: true, checkFalsy: true })
    .isEmail()
    .withMessage("Please enter a valid email")
    .bail()
    .normalizeEmail(),
  body("password")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const validateTask = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  body("description")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("status")
    .optional({ nullable: true, checkFalsy: true })
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed"),
  body("priority")
    .optional({ nullable: true, checkFalsy: true })
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),
  body("category")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage("Category cannot exceed 50 characters"),
  body("dueDate")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("Due date must be a valid date"),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateTask,
};
