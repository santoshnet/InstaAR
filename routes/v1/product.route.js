const router = require("express").Router();
const verifyToken = require("../../middleware/VerifyToken");
const isAdmin = require("../../middleware/IsAdmin");

const {products, updateProduct, addProduct, deleteProduct,productData } = require("../../controller/product.controller");
const {features } = require("../../controller/feature.controller");

const {productUpload} = require('../../helper/fileHelper');

router.post("/create", productUpload.fields([
    {
        name: "image",
        maxCount: 1,
    },
    {
        name: "file",
        maxCount: 1,
    }
]),  addProduct);
router.get("/:id", productData);
router.get("/:id/features", features);
router.get("/", products);
router.delete("/:id", deleteProduct);
router.patch("/:id", productUpload.fields([
    {
        name: "image",
        maxCount: 1,
    },
    {
        name: "file",
        maxCount: 1,
    }
]), updateProduct);


module.exports = router;
