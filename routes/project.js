const express = require("express");
const prisma = require("../prisma/client");
const authenticateToken = require("../middleware/auth");
const checkProjectOwnership = require("../middleware/project-ownership");
const router = express.Router();

// Get all projects for a user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.userId },
      include: { tasks: true },
    });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new project
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const project = await prisma.project.create({
      data: {
        name,
        userId: req.user.userId,
      },
    });
    res.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a project
router.put(
  "/:projectId",
  authenticateToken,
  checkProjectOwnership,
  async (req, res) => {
    try {
      const { projectId } = req.params;
      const { name } = req.body;
      const project = await prisma.project.update({
        where: { id: parseInt(projectId) },
        data: { name },
      });
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete a project
router.delete(
  "/:projectId",
  authenticateToken,
  checkProjectOwnership,
  async (req, res) => {
    try {
      const { projectId } = req.params;
      await prisma.project.delete({
        where: { id: parseInt(projectId) },
      });
      res.json({ message: "Project deleted" });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
