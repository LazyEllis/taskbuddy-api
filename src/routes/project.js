const express = require("express");
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const {
  createProjectValidator,
  updateProjectValidator,
  deleteProjectValidator,
} = require("../validators/projectValidators");
const authenticateToken = require("../middleware/auth");
const checkProjectOwnership = require("../middleware/projectOwnership");
const validate = require("../middleware/validate");
const router = express.Router();

router.use(authenticateToken);

router.get("/", getAllProjects);
router.post("/", createProjectValidator, validate, createProject);
router.put(
  "/:projectId",
  checkProjectOwnership,
  updateProjectValidator,
  validate,
  updateProject
);
router.delete(
  "/:projectId",
  checkProjectOwnership,
  deleteProjectValidator,
  validate,
  deleteProject
);

module.exports = router;
