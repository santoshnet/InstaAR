const Product = require("../models/Product");
const Feature = require("../models/Feature");

async function productDetails(id) {

    const productData = await Product.findById(id);
    const features = await Feature.find({product: id});

    return {
        status: 200,
        type: "success",
        products: productData,
        features: features,
    };
}

async function products(params, user) {
    const page = parseInt(params.page);
    const limit = parseInt(params.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let products = [];
    try {
        if (user.role === "admin") {
            products = await Product.find()
                .limit(limit)
                .skip(startIndex)
                .exec();
        } else {
            products = await Product.find({user:user.id})
                .limit(limit)
                .skip(startIndex)
                .exec();
        }


        return {
            status: 200,
            type: "success",
            products: products,
        };
    } catch (e) {
        return {
            status: 500,
            type: "error",
            error: e.message,
        };
    }
}

async function updateProduct(body, image, file, id) {
    let requiredFields = [];

    if (!body.title) {
        requiredFields.push({title: "title field required"});
    } else if (body.description && body.description.length === 0) {
        requiredFields.push({
            phone: "Enter Product Description.",
        });
    }

    if (requiredFields.length > 0) {
        return {
            status: 400,
            type: "Bad request",
            error: requiredFields,
        };
    }


    if (image) {
        let imageData = image.destination.replace("public/", "") + image.filename;
        body["image"] = imageData;
    }
    if (file) {
        let fileData = file.destination.replace("public/", "") + file.filename;
        body["file"] = fileData;
    }


    const product = await Product.findByIdAndUpdate(id, body, {
        new: true,
    });


    return {
        status: 200,
        type: "success",
        product: product,
        message: "Product update successfully!"

    };
}


async function addProduct(body, image, file,user) {
    let requiredFields = [];
    if (!body.title) {
        requiredFields.push({name: "title field required"});
    } else if (body.title.length < 3) {
        requiredFields.push({
            title: "Title field must have text more then 3 letters.",
        });
    }
    if (!body.description) {
        requiredFields.push({description: "Description field required"});
    }


    if (requiredFields.length > 0) {
        return {
            status: 400,
            type: "Bad request",
            error: requiredFields,
        };
    }

    if (image) {
        let imageData = image.destination.replace("public/", "") + image.filename;
        body["image"] = imageData;
    }
    if (file) {
        let fileData = file.destination.replace("public/", "") + file.filename;
        body["file"] = fileData;
    }
   body['user']=user.id;

    let product = new Product(body);
    try {
        product = await product.save();
        return {
            status: 200,
            type: "success",
            product: product,
            message: "Product added successfully!"

        };
    } catch (error) {
        return {
            status: 500,
            type: "error",
            error: "Internal server error.",
        };
    }
}

async function deleteProduct(id) {
    try {
        const result = await Product.findByIdAndDelete(id);

        return {
            status: 204,
            type: "success",
        };
    } catch (error) {
        return {
            status: 500,
            type: "error",
            error: error,
        };
    }
}


module.exports = {
    productDetails,
    updateProduct,
    addProduct,
    deleteProduct,
    products
};
