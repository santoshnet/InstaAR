const bannerService = require("../services/banner.service");
const TypedError = require("../helper/ErrorHandler");


async function bannerData(req, res, next) {
    const response = await bannerService.bannerList();

    return res.status(response.status).json(response);

}

async function createBanner(req, res, next) {
    const {heading, subHeading, tagLine, summary, customText, buttonColor, buttonTextColor, status} = req.body;
    const image = req.files.image ? req.files.image[0] : null;
    const background = req.files.background ? req.files.background[0] : null;

    const response = await bannerService.createBanner(heading, subHeading, tagLine, summary, customText, buttonColor, buttonTextColor, status, image, background);

    return res.status(response.status).json(response);


}

async function updateBanner(req, res, next) {
    const {heading, subHeading, tagLine, summary, customText, buttonColor, status, buttonTextColor} = req.body;
    const image = req.files.image ? req.files.image[0] : null;
    const background = req.files.background ? req.files.background[0] : null;

    const response = await bannerService.updateBanner(req.params.id, heading, subHeading, tagLine, summary, customText, buttonColor, buttonTextColor, status, image, background);

    return res.status(response.status).json(response);

}

async function deleteBanner(req, res, next) {

    const response = await bannerService.deleteBanner(req.params.id);

    return res.status(response.status).json(response);

}

module.exports = {bannerData, createBanner, updateBanner, deleteBanner};
