const express = require("express");
const router = express.Router();
const {
  addMoney,
  checkBalance,
  transferBalance,
} = require("../controllers/Account.controller");
const { authMiddleware } = require("../middleware/Auth.middleware");

router.route("/add-balance").post(authMiddleware, addMoney);
router.route("/check-balance").get(authMiddleware, checkBalance);
router.route("/transfer-amount").post(authMiddleware, transferBalance);

module.exports = router;
