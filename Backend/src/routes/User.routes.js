const express = require("express");
const { Signup, login } = require("../controllers/User.controller");
const router = express.Router();

router.route("/regiters").post(Signup);
router.route("/login").post(login);

module.exports = router;