const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidators");
const validate = require("../middleware/validate");
const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);

module.exports = router;
