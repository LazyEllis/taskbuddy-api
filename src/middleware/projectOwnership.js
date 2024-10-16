const prisma = require("../config/database");

const checkProjectOwnership = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const userId = req.user.userId;

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
    next(error);
  }
};

module.exports = checkProjectOwnership;
