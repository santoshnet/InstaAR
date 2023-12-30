const Feature = require("../models/Feature");

async function featureDetails(id) {

    const featureData = await Feature.findById(id);


    return {
        status: 200,
        type: "success",
        feature: featureData,
    };
}

async function  features(params, id) {
    const page = parseInt(params.page);
    const limit = parseInt(params.limit);

    const startIndex = (page - 1) * limit;

    let features = [];
    try {

        features = await Feature.find({product: id})
                .limit(limit)
                .skip(startIndex)
                .exec();



        return {
            status: 200,
            type: "success",
            features: features,
        };
    } catch (e) {
        return {
            status: 500,
            type: "error",
            error: e.message,
        };
    }
}

async function updateFeature(body, image, video, id) {
    let requiredFields = [];

    if (!body.title) {
        requiredFields.push({title: "title field required"});
    } else if (body.description && body.description.length === 0) {
        requiredFields.push({
            phone: "Enter feature Description.",
        });
    }else if (body.product && body.product.length === 0) {
        requiredFields.push({
            phone: "Enter product id.",
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
    if (video) {
        let videoData = video.destination.replace("public/", "") + video.filename;
        body["video"] = videoData;
    }


    const feature = await Feature.findByIdAndUpdate(id, body, {
        new: true,
    });


    return {
        status: 200,
        type: "success",
        feature: feature,
        message:"Feature update successfully!"

    };
}


async function addFeature(body, image, video) {
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
    } if (!body.product && body.product.length===0) {
        requiredFields.push({productId: "Product id is required"});
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
    if (video) {
        let videoData = video.destination.replace("public/", "") + video.filename;
        body["video"] = videoData;
    }


    let feature = new Feature(body);
    try {
        feature = await feature.save();
        return {
            status: 200,
            type: "success",
            feature: feature,
            message:"Feature added successfully!"

        };
    } catch (error) {
        return {
            status: 500,
            type: "error",
            error: "Internal server error.",
        };
    }
}

async function deleteFeature(id) {
    try {
        const result = await Feature.findByIdAndDelete(id);

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
    featureDetails,
    updateFeature,
    addFeature,
    deleteFeature,
    features
};
