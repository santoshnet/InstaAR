const productService = require("../services/product.service");

async function productData(req, res, next) {
    const response = await productService.productDetails(req.params.id);
    return res.status(response.status).json(response);
}

async function products(req, res, next) {
    const response = await productService.products({
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    }, req.user);
    return res.status(response.status).json(response);
}

async function addProduct(req, res, next) {
    const {body} = req;
    const image = req.files.image ? req.files.image[0] : null;
    const file = req.files.file ? req.files.file[0] : null;
    const user = req.user;
    const response = await productService.addProduct(body, image, file,user);
    return res.status(response.status).json(response);
}

async function updateProduct(req, res, next) {
    const {body} = req;
    const image = req.files.image ? req.files.image[0] : null;
    const file = req.files.file ? req.files.file[0] : null;
    const response = await productService.updateProduct(body, image, file,req.params.id);

    return res.status(response.status).json(response);
}

async function deleteProduct(req, res, next) {
    const response = await productService.deleteProduct(req.params.id);
    return res.status(response.status).json(response);
}

module.exports = {
    productData,
    updateProduct,
    products,
    addProduct,
    deleteProduct
};
