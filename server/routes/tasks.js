const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");
const { protect } = require("../middleware/auth");
const { validateTask } = require("../middleware/validation");

const router = express.Router();

// All routes are protected
router.use(protect);

router.route("/").get(getTasks).post(validateTask, createTask);

router.get("/stats", getTaskStats);

router
  .route("/:id")
  .get(getTask)
  .put(validateTask, updateTask)
  .delete(deleteTask);

module.exports = router;
