const settingService = require("../services/setting.service");

async function settingData(req, res, next) {
    const response = await settingService.settingData();
    return res.status(response.status).json(response);
}

async function createSetting(req, res, next) {
    const logo = req.files.logo ? req.files.logo[0] : null;
    const favicon = req.files.favIcon ? req.files.favIcon[0] : null;
    const banner = req.files.banner ? req.files.banner[0] : null;
    let {
        body
    } = req;

    body.logo = logo;
    body.favIcon = favicon;
    body.banner = banner;

    const response = await settingService.createSetting(body);
    return res.status(response.status).json(response);
}

module.exports = {settingData, createSetting};
