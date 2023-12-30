const router = require("express").Router();
const verifyToken = require("../../middleware/VerifyToken");
const isAdmin = require("../../middleware/IsAdmin");

const { updateFeature, addFeature, deleteFeature,featureData } = require("../../controller/feature.controller");

const {upload} = require('../../helper/fileHelper');

router.post("/create", upload.fields([
    {
        name: "image",
        maxCount: 1,
    },
    {
        name: "video",
        maxCount: 1,
    }
]),  addFeature);
router.get("/:id", featureData);
router.delete("/:id", deleteFeature);
router.patch("/:id", upload.fields([
    {
        name: "image",
        maxCount: 1,
    },
    {
        name: "video",
        maxCount: 1,
    }
]), updateFeature);


module.exports = router;
