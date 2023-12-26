const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = `public/uploads/images/`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {recursive: true});
        }
        cb(null, path);
        //   cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});


const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = `public/uploads/${req.user.id}/products/`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {recursive: true});
        }
        cb(null, path);
        //   cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const featureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = `public/uploads/${req.user.id}/feature/`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {recursive: true});
        }
        cb(null, path);
        //   cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const bannerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = `public/uploads/${req.user.id}/banner/`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {recursive: true});
        }
        cb(null, path);
        //   cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({storage: storage});
const productUpload = multer({storage: productStorage});
const featureUpload = multer({storage: featureStorage});
const bannerUpload = multer({storage: bannerStorage});

module.exports = {upload, featureUpload, productUpload,bannerUpload};
