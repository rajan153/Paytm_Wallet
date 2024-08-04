const express = require("express");
const { Signup, login, getUsers } = require("../controllers/User.controller");
const router = express.Router();
const { authMiddleware } = require("../middleware/Auth.middleware");

router.route("/regiters").post(Signup);
router.route("/login").post(login);
router.route("/getusers").get(authMiddleware, getUsers);

module.exports = router;