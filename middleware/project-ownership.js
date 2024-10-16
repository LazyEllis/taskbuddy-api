const prisma = require("../prisma/client");

// Middleware to check for project ownership
const checkProjectOwnership = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const userId = req.user.id;

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: userId,
      },
    });

    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found or unauthorized" });
    }

    next();
  } catch (error) {
    console.error("Error checking project ownership:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = checkProjectOwnership;
