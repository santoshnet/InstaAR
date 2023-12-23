const router = require("express").Router();

const {
  login,
  sendOTP,
  register,
  verifyOTP,
} = require("../../controller/auth.controller");

router.post("/login", login);
router.post("/register", register);
router.post("/admin/verify", verifyOTP);
router.post("/send-otp", sendOTP);

module.exports = router;
