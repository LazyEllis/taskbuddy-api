const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  setTaskComplete,
  setTaskIncomplete,
} = require("../controllers/taskController");
const {
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
  setTaskCompleteValidator,
} = require("../validators/taskValidators");
const authenticateToken = require("../middleware/auth");
const checkProjectOwnership = require("../middleware/projectOwnership");
const validate = require("../middleware/validate");
const router = express.Router({ mergeParams: true });

router.use(authenticateToken);
router.use(checkProjectOwnership);

router.get("/", getAllTasks);
router.post("/", createTaskValidator, validate, createTask);
router.put("/:taskId", updateTaskValidator, validate, updateTask);
router.delete("/:taskId", deleteTaskValidator, validate, deleteTask);
router.put(
  "/:taskId/complete",
  setTaskCompleteValidator,
  validate,
  setTaskComplete
);
router.delete(
  "/:taskId/complete",
  setTaskCompleteValidator,
  validate,
  setTaskIncomplete
);

module.exports = router;
