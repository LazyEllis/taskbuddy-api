const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  setTaskComplete,
  setTaskIncomplete,
} = require("../controllers/taskController");
const authenticateToken = require("../middleware/auth");
const checkProjectOwnership = require("../middleware/projectOwnership");
const router = express.Router({ mergeParams: true });

router.use(authenticateToken);
router.use(checkProjectOwnership);

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);
router.put("/:taskId/complete", setTaskComplete);
router.delete("/:taskId/complete", setTaskIncomplete);

module.exports = router;
