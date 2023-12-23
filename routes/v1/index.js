var express = require('express');
var router = express.Router();
const verifyToken = require("../../middleware/VerifyToken");
const authRoute = require("./auth.route");

router.use("/auth", authRoute);


module.exports = router;
