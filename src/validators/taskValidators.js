const { body, param } = require("express-validator");

exports.createTaskValidator = [
  body("name")
    .isLength({ min: 1 })
    .withMessage("Task name cannot be empty")
    .trim()
    .escape(),
  body("description").optional().trim().escape(),
  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),
  body("priority")
    .optional()
    .isIn(["HIGH", "MEDIUM", "LOW"])
    .withMessage("Invalid priority"),
];

exports.updateTaskValidator = [
  param("taskId").isInt().withMessage("Invalid task ID"),
  body("name")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Task name cannot be empty")
    .trim()
    .escape(),
  body("description").optional().trim().escape(),
  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),
  body("priority")
    .optional()
    .isIn(["HIGH", "MEDIUM", "LOW"])
    .withMessage("Invalid priority"),
];

exports.deleteTaskValidator = [
  param("taskId").isInt().withMessage("Invalid task ID"),
];

exports.setTaskCompleteValidator = [
  param("taskId").isInt().withMessage("Invalid task ID"),
];
