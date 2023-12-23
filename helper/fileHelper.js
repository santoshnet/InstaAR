const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = `public/uploads/${req.user.id}/`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path,{ recursive: true });
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
    let path = `public/uploads/${req.user.id}/banners/`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path,{ recursive: true });
    }
    cb(null, path);
    //   cb(null, "public/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = `public/uploads/${req.user.id}/categories/`;
    if (!fs.existsSync(path, { recursive: true })) {
      fs.mkdirSync(path,{ recursive: true });
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
      fs.mkdirSync(path,{ recursive: true });
    }
    cb(null, path);
    //   cb(null, "public/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const arImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = `public/uploads/${req.user.id}/ArImage/`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path,{ recursive: true });
    }
    cb(null, path);
    //   cb(null, "public/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const firebaseImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = `public/firebase/`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path,{ recursive: true });
    }
    cb(null, path);
    //   cb(null, "public/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const bannerUpload = multer({ storage: bannerStorage });
const categoryUpload = multer({ storage: categoryStorage });
const productUpload = multer({ storage: productStorage });
const arImageUpload = multer({ storage: arImageStorage });
const firebaseImageUpload = multer({ storage: firebaseImageStorage });

module.exports = { upload, bannerUpload, categoryUpload, productUpload, arImageUpload, firebaseImageUpload };
