const express = require("express");
const prisma = require("../prisma/client");
const authenticateToken = require("../middleware/auth");
const checkProjectOwnership = require("../middleware/project-ownership");
const router = express.Router({ mergeParams: true });

// Get all tasks for a project
router.get("/", authenticateToken, checkProjectOwnership, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId: parseInt(req.params.projectId) },
    });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new task to a project
router.post("/", authenticateToken, checkProjectOwnership, async (req, res) => {
  try {
    const { name, description, dueDate, priority } = req.body;
    const task = await prisma.task.create({
      data: {
        name,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        projectId: parseInt(req.params.projectId),
      },
    });
    res.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update task
router.put(
  "/:taskId",
  authenticateToken,
  checkProjectOwnership,
  async (req, res) => {
    try {
      const { name, description, dueDate, priority } = req.body;
      const task = await prisma.task.update({
        where: { id: parseInt(req.params.taskId) },
        data: {
          name,
          description,
          dueDate: dueDate ? new Date(dueDate) : null,
          priority,
          projectId: parseInt(req.params.projectId),
        },
      });
      res.json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete a task
router.delete(
  "/:taskId",
  authenticateToken,
  checkProjectOwnership,
  async (req, res) => {
    try {
      await prisma.task.delete({
        where: { id: parseInt(req.params.taskId) },
      });
      res.json({ message: "Task deleted" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Set a task as complete
router.put(
  "/:taskId/complete",
  authenticateToken,
  checkProjectOwnership,
  async (req, res) => {
    try {
      const task = await prisma.task.update({
        where: { id: parseInt(req.params.taskId) },
        data: { completed: true },
      });
      res.json(task);
    } catch (error) {
      console.error("Error updating task status", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Set a task as incomplete
router.delete(
  "/:taskId/complete",
  authenticateToken,
  checkProjectOwnership,
  async (req, res) => {
    try {
      const task = await prisma.task.update({
        where: { id: parseInt(req.params.taskId) },
        data: { completed: false },
      });
      res.json(task);
    } catch (error) {
      console.error("Error updating task status", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
