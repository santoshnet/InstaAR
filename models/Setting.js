var mongoose = require("mongoose");

var settingSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            default: null
        },

        address: {
            type: String,
            default: null
        },
        phone: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: null
        },

        copyright: {
            type: String,
            default: null
        },

        logo: {
            type: String,
            default: null
        },
        favIcon: {
            type: String,
            default: null
        },
        banner: {
            type: String,
            default: null
        }

    },
    {timestamps: true}
);

var Setting = (module.exports = mongoose.model("Setting", settingSchema));
