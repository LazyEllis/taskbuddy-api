const prisma = require("../config/database");

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId: parseInt(req.params.projectId) },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
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
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { name, description, dueDate, priority } = req.body;
    const task = await prisma.task.update({
      where: { id: parseInt(req.params.taskId) },
      data: {
        name,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
      },
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await prisma.task.delete({
      where: { id: parseInt(req.params.taskId) },
    });
    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

exports.setTaskComplete = async (req, res, next) => {
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(req.params.taskId) },
      data: { completed: true },
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.setTaskIncomplete = async (req, res, next) => {
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(req.params.taskId) },
      data: { completed: false },
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
};
