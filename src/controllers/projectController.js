const prisma = require("../config/database");

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.userId },
      include: { tasks: true },
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

exports.createProject = async (req, res, next) => {
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
    next(error);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { name } = req.body;
    const project = await prisma.project.update({
      where: { id: parseInt(projectId) },
      data: { name },
    });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    await prisma.project.delete({
      where: { id: parseInt(projectId) },
    });
    res.json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};
