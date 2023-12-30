var express = require('express');
var router = express.Router();
const verifyToken = require("../../middleware/VerifyToken");
const authRoute = require("./auth.route");
const settingRoute = require("./setting.route");
const bannerRoute = require("./banner.route");
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const featureRoute = require("./feature.route");

router.use("/auth", authRoute);
router.use("/setting", settingRoute);
router.use("/users", userRoute);
router.use("/banners", verifyToken, bannerRoute);
router.use("/products", verifyToken, productRoute);
router.use("/features", verifyToken, featureRoute);


module.exports = router;
