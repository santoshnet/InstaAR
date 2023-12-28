const router = require("express").Router();
const verifyToken = require("../../middleware/VerifyToken");
const isAdmin = require("../../middleware/IsAdmin");

const {userData, userUpdate, addUser, deleteUser, users } = require("../../controller/user.controller");
const {upload} = require('../../helper/fileHelper');

router.post("/create",isAdmin, upload.fields([
    {
        name: "profileImage",
        maxCount: 1,
    },
    {
        name: "banner",
        maxCount: 1,
    }
]),  addUser);
router.get("/details", verifyToken, userData);
router.get("/", isAdmin, users);
router.delete("/:id",isAdmin, deleteUser);
router.patch("/:id",verifyToken, upload.fields([
    {
        name: "profileImage",
        maxCount: 1,
    },
    {
        name: "banner",
        maxCount: 1,
    }
]), userUpdate);


module.exports = router;
