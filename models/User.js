var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            default: null,
        },
        companyName: {
            type: String,
            default: null,
        },
        profession: {
            type: String,
            default: null,
        },
        phone: {
            type: String,
            index: true,
            required: false,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            index: true,
            required: true,
            lowercase: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        profileImage: {
            type: String,
            default: null,
        },
        banner: {
            type: String,
            default: null,
        },
        about: {
            type: String,
            default: null,
        },
        location: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            enum: ["user", "admin", "seller"],
            default: "user",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },

        isApproved: {
            type: Boolean,
            default: false,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: String,
            default: null,
        },
        fcm_token: {
            type: String,
            default: null,
        },

        uploadLimit: {
            type: Number,
            default: 10,
        }


    },
    {timestamps: true},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
            },
        },
    },
);


var User = (module.exports = mongoose.model("User", userSchema));


module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save().then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        });
    });
}