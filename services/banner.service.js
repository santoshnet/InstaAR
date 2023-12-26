const Banner = require("../models/Banner");

async function bannerList() {
    try {
        const banners = await Banner.find({});
        return {
            status: 200,
            type: "success",
            banners: banners
        };
    } catch (error) {
        return {
            status: 500,
            type: "error",
            error: error,
        };
    }
}

async function createBanner(heading, subHeading, tagLine, summary, customText, buttonColor, buttonTextColor,status, image, background) {
    let requiredFields = [];

    if (!heading) {
        requiredFields.push({title: "Heading field required"});
    } else if (heading.length < 3) {
        requiredFields.push({
            title: "Heading field must have text more then 3 letters.",
        });
    }
    if (!subHeading) {
        requiredFields.push({title: "Sub-Heading field required"});
    } else if (subHeading.length < 3) {
        requiredFields.push({
            title: "Sub-Heading field must have text more then 3 letters.",
        });
    }
    if (!image) {
        requiredFields.push({image: "image field required"});
    } else if (!image.filename) {
        requiredFields.push({image: "image required"});
    }
    if (!background) {
        requiredFields.push({background: "background field required"});
    } else if (!background.filename) {
        requiredFields.push({background: "background required"});
    }


    if (requiredFields.length > 0) {
        return {
            status: 400,
            type: "Bad request",
            error: requiredFields,
        };
    }

    let imageData = image.destination.replace("public/", "") + image.filename;
    let backgroundData = background.destination.replace("public/", "") + background.filename;

    let banner = new Banner({
        heading: heading,
        subHeading: subHeading,
        tagLine: tagLine,
        summary: summary,
        customText: customText,
        buttonColor: buttonColor,
        buttonTextColor: buttonTextColor,
        image: imageData,
        background: backgroundData,
        status: status,
    });
    try {
        banner = await banner.save();
        return {
            status: 200,
            type: "success",
            banner: banner,
            message: "Banner added successfully."

        };
    } catch (error) {
        return {
            status: 500,
            type: "error",
            error: "Internal server error.",
        };
    }
}

async function updateBanner(id, heading, subHeading, tagLine, summary, customText, buttonColor, buttonTextColor, status, image, background) {

    let requiredFields = [];

    if (!heading) {
        requiredFields.push({title: "Heading field required"});
    } else if (heading.length < 3) {
        requiredFields.push({
            title: "Heading field must have text more then 3 letters.",
        });
    }
    if (!subHeading) {
        requiredFields.push({title: "Sub-Heading field required"});
    } else if (subHeading.length < 3) {
        requiredFields.push({
            title: "Sub-Heading field must have text more then 3 letters.",
        });
    }

    if (requiredFields.length > 0) {
        return {
            status: 400,
            type: "Bad request",
            error: requiredFields,
        };
    }


    try {
        const banner = await Banner.findById(id);
        banner.heading = heading;
        banner.subHeading = subHeading;
        banner.tagLine = tagLine;
        banner.summary = summary;
        banner.customText = customText;
        banner.buttonColor = buttonColor;
        banner.buttonTextColor = buttonTextColor;
        banner.status = status;
        if (image) {
            let imageData = image.destination.replace("public/", "") + image.filename;
            banner.image = imageData;
        }
        if (background) {
            let backgroundData = background.destination.replace("public/", "") + background.filename;
            banner.background = backgroundData;
        }

        banner.save();
        return {
            status: 200,
            type: "success",
            banner: banner,
        };
    } catch (error) {
        return {
            status: 500,
            type: "error",
            error: error,
        };
    }
}

async function deleteBanner(id) {
    try {
        const result = await Banner.findByIdAndDelete(id);
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

module.exports = {bannerList, createBanner, updateBanner, deleteBanner};
