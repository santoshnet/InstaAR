const router = require("express").Router();
const {bannerData, createBanner, updateBanner, deleteBanner} = require("../../controller/banner.controller");
const {bannerUpload} = require('../../helper/fileHelper');

router.get("/", bannerData);
router.post("/create", bannerUpload.fields([
    {
        name: "image",
        maxCount: 1,
    },
    {
        name: "background",
        maxCount: 1,
    }
]), createBanner);
router.patch("/:id", bannerUpload.fields([
    {
        name: "image",
        maxCount: 1,
    },
    {
        name: "background",
        maxCount: 1,
    }
]), updateBanner);
router.delete("/:id", deleteBanner);


module.exports = router;