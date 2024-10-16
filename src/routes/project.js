const express = require("express");
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const authenticateToken = require("../middleware/auth");
const checkProjectOwnership = require("../middleware/projectOwnership");
const router = express.Router();

router.use(authenticateToken);

router.get("/", getAllProjects);
router.post("/", createProject);
router.put("/:projectId", checkProjectOwnership, updateProject);
router.delete("/:projectId", checkProjectOwnership, deleteProject);

module.exports = router;
