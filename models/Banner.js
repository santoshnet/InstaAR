var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var bannerSchema = mongoose.Schema(
    {
        heading: {
            type: String,
            default: null,
        },
        subHeading: {
            type: String,
            default: null,
        },
        tagLine: {
            type: String,
            default: null,
        },
        summary: {
            type: String,
            default: null,
        },
        customText: {
            type: String,
            default: null,
        },
        buttonColor: {
            type: String,
            default: "#262262",
        },
        buttonTextColor: {
            type: String,
            default: "#ffffff",
        },
        image: {
            type: String,
            default: null,
        },
        background: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        }
    },
    {timestamps: true}
);


var Banner = (module.exports = mongoose.model("Banner", bannerSchema));
