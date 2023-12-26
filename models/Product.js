var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var productSchema = mongoose.Schema(
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
        file: {
            type: String,
            default: null,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        }
    },
    {timestamps: true}
);


var Product = (module.exports = mongoose.model("Product", productSchema));
