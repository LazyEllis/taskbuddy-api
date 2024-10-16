const { body, param } = require("express-validator");

exports.createProjectValidator = [
  body("name")
    .isLength({ min: 1 })
    .withMessage("Project name cannot be empty")
    .trim()
    .escape(),
];

exports.updateProjectValidator = [
  param("projectId").isInt().withMessage("Invalid project ID"),
  body("name")
    .isLength({ min: 1 })
    .withMessage("Project name cannot be empty")
    .trim()
    .escape(),
];

exports.deleteProjectValidator = [
  param("projectId").isInt().withMessage("Invalid project ID"),
];
