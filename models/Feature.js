var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var featureSchema = mongoose.Schema(
    {
        title: {
            type: String,
            default: null,
        },
        description: {
            type: String,
            default: null,
        },
        image: {
            type: String,
            default: null,
        },
        video: {
            type: String,
            default: null,
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        }
    },
    {timestamps: true}
);


var Product = (module.exports = mongoose.model("Feature", featureSchema));
