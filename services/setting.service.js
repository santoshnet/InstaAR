const Setting = require("../models/Setting");

async function settingData() {
    try {
        const setting = await Setting.findOne();
        return {
            status: 200,
            type: "success",
            setting: setting,
        };
    } catch (error) {
        return {
            status: 500,
            type: "error",
            error: error,
        };
    }
}

async function createSetting(newSetting) {
    const setting = await Setting.findOne();

    if (newSetting.logo) {
        const logoData =
            newSetting.logo.destination.replace("public/", "") +
            newSetting.logo.filename;
        newSetting.logo = logoData;
        if (setting) {
            setting.logo = logoData
        }

    }
    if (newSetting.favIcon) {
        const favIconData =
            newSetting.favIcon.destination.replace("public/", "") +
            newSetting.favIcon.filename;
        newSetting.favIcon = favIconData;
        if (setting) {
            setting.favIcon = favIconData
        }
    }
    if (newSetting.banner) {
        const bannerData =
            newSetting.banner.destination.replace("public/", "") +
            newSetting.banner.filename;
        newSetting.banner = bannerData;
        if (setting) {
            setting.banner = bannerData
        }
    }


    if (!setting) {

        const setting = new Setting(newSetting);
        setting.save();
        return {
            status: 200,
            type: "success",
            setting: setting,
            message: "Setting has been created successfully."
        };
    } else {
        setting.title = newSetting.title;
        setting.description = newSetting.description;
        setting.address = newSetting.address;
        setting.email = newSetting.email;
        setting.phone = newSetting.phone;
        setting.copyright = newSetting.copyright;
        setting.save();

        return {
            status: 200,
            type: "success",
            setting: setting,
            message: "Setting has been updated successfully."
        };
    }

}

module.exports = {
    settingData,
    createSetting,
};
