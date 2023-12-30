const featureService = require("../services/feature.service");

async function featureData(req, res, next) {
    const response = await featureService.featureDetails(req.params.id);
    return res.status(response.status).json(response);
}

async function features(req, res, next) {
    const response = await featureService.features({
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    }, req.params.id);
    return res.status(response.status).json(response);
}

async function addFeature(req, res, next) {
    const {body} = req;
    const image = req.files.image ? req.files.image[0] : null;
    const video = req.files.video ? req.files.video[0] : null;
    const response = await featureService.addFeature(body, image, video);
    return res.status(response.status).json(response);
}

async function updateFeature(req, res, next) {
    const {body} = req;
    const image = req.files.image ? req.files.image[0] : null;
    const video = req.files.video ? req.files.video[0] : null;
    const response = await featureService.updateFeature(body, image, video,req.params.id);

    return res.status(response.status).json(response);
}

async function deleteFeature(req, res, next) {
    const response = await featureService.deleteFeature(req.params.id);
    return res.status(response.status).json(response);
}

module.exports = {
    featureData,
    updateFeature,
    features,
    addFeature,
    deleteFeature
};
