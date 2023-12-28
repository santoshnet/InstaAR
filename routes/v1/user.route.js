const router = require("express").Router();
const {userData, userUpdate, addUser, deleteUser, topSellers, staffs, sendUserQueryEmail, profileUpdate,walletAddressUpdate, removeUser } = require("../controller/user.controller");
const {upload} = require('../helper/fileHelper');

router.post("/create", upload.fields([
    {
        name: "profileImage",
        maxCount: 1,
    },
    {
        name: "banner",
        maxCount: 1,
    }
]), addUser);
router.get("/details", userData);
router.get("/admin/staffs", staffs);
router.delete("/:id", deleteUser);
router.get("/top/sellers", topSellers);
router.patch("/:id", upload.fields([
    {
        name: "profileImage",
        maxCount: 1,
    },
    {
        name: "banner",
        maxCount: 1,
    }
]), userUpdate);
router.patch("/profile/update", profileUpdate);
router.post("/email/send", sendUserQueryEmail);
router.patch("/wallet-address/update", walletAddressUpdate);
router.get("/delete", removeUser);


module.exports = router;
