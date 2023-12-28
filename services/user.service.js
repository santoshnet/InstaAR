const User = require("../models/User");
const Admin = require("../models/Admin");
var Email = require("../mailer/email");
const Firebase = require("../helper/Firebase");

async function userDetails(user) {

    const userData = await User.findById(user.id);
    if (!user) {
        return {
            status: 404,
            type: "error",
            error: "User not found with this id.",
        };
    }
    return {
        status: 200,
        type: "success",
        user: userData,
    };
}

async function sellers(params) {
    const page = parseInt(params.page);
    const limit = parseInt(params.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await User.countDocuments({role: "seller"}).exec())) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    try {
        results.results = await User.find({role: "seller"})
            .limit(limit)
            .skip(startIndex)
            .exec();
        return {
            status: 200,
            type: "success",
            user: results,
        };
    } catch (e) {
        return {
            status: 500,
            type: "error",
            error: e.message,
        };
    }
}


async function staffs(params) {
    const page = parseInt(params.page);
    const limit = parseInt(params.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await Admin.countDocuments().exec())) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    try {
        results.results = await Admin.find()
            .limit(limit)
            .skip(startIndex)
            .exec();
        return {
            status: 200,
            type: "success",
            user: results,
        };
    } catch (e) {
        return {
            status: 500,
            type: "error",
            error: e.message,
        };
    }
}

async function topSellers(params) {
    const page = parseInt(params.page);
    const limit = parseInt(params.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await User.countDocuments({role: "seller"}).exec())) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    try {
        results.results = await User.find({role: "seller"}).sort({ratingsAverage: 1})
            .limit(limit)
            .skip(startIndex)
            .exec();
        return {
            status: 200,
            type: "success",
            user: results,
        };
    } catch (e) {
        return {
            status: 500,
            type: "error",
            error: e.message,
        };
    }
}

async function sellerDetails(id) {
    try {
        const result = await User.findById(id);
        return {
            status: 200,
            type: "success",
            user: result,
        };
    } catch (e) {
        return {
            status: 500,
            type: "error",
            error: e.message,
        };
    }
}

async function customers(params) {
    const page = parseInt(params.page);
    const limit = parseInt(params.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await User.countDocuments({role: "user"}).exec())) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    try {
        results.results = await User.find({role: "user"})
            .limit(limit)
            .skip(startIndex)
            .exec();
        return {
            status: 200,
            type: "success",
            user: results,
        };
    } catch (e) {
        return {
            status: 500,
            type: "error",
            error: e.message,
        };
    }
}

async function adminDetails(user) {
    const admin = await Admin.findById(user.id);
    if (!admin) {
        return {
            status: 404,
            type: "error",
            error: "User not found with this id.",
        };
    }
    return {
        status: 200,
        type: "success",
        user: admin,
    };
}

async function userUpdate(body, profileImage, banner, id) {
    let requiredFields = new Array();

    if (!body.phone) {
        requiredFields.push({title: "title field required"});
    } else if (body.phone.length < 10) {
        requiredFields.push({
            phone: "Entered email is not a valid email.",
        });
    }

    if (requiredFields.length > 0) {
        return {
            status: 400,
            type: "Bad request",
            error: requiredFields,
        };
    }


    if (profileImage) {
        let imageData = profileImage.destination.replace("public/", "") + profileImage.filename;
        body["profileImage"] = imageData;
    }
    if (banner) {
        let imageData = banner.destination.replace("public/", "") + banner.filename;
        body["banner"] = imageData;
    }

    const userData = await User.findById(id);

    const user = await User.findByIdAndUpdate(id, body, {
        new: true,
    });

    if(userData.isApproved===false && user.isApproved===true && userData.fcm_token.length>0){
        const data = {
            title:"User Approved",
            body:"Your account has been approved by admin. You can upload product now."
        }
         Firebase.sendNotification(data, [userData.fcm_token]);
    }




    return {
        status: 200,
        type: "success",
        user: user,
    };
}

async function adminUpdate(body, image, user) {
    const userData = await Admin.findById(user.id);

    let requiredFields = new Array();
    if (!body.name) {
        requiredFields.push({name: "Name field required"});
    } else if (body.name.length < 5) {
        requiredFields.push({
            name: "Name field must have text more then 5 letters.",
        });
    }
    if (!body.email) {
        requiredFields.push({email: "Email field required"});
    } else if (body.email.length < 10) {
        requiredFields.push({
            email: "Entered email is not a valid email.",
        });
    }
    if (!body.phone) {
        requiredFields.push({phone: "Phone field required"});
    } else if (body.email.length < 10) {
        requiredFields.push({
            email: "Entered Phone is not a valid email.",
        });
    }

    if (requiredFields.length > 0) {
        return {
            status: 400,
            type: "Bad request",
            error: requiredFields,
        };
    }

    userData.name = body.name;
    userData.email = body.email;
    userData.phone = body.phone;

    if (image) {
        let imageData = image.destination.replace("public/", "") + image.filename;
        userData.profileImage = imageData;
    }

    userData.save();

    return {
        status: 200,
        type: "success",
        user: userData,
    };
}

async function addUser(body, profileImage, banner) {
    let requiredFields = new Array();
    if (!body.name) {
        requiredFields.push({name: "title field required"});
    } else if (body.name.length < 3) {
        requiredFields.push({
            name: "Name field must have text more then 5 letters.",
        });
    }
    if (!body.email) {
        requiredFields.push({email: "title field required"});
    } else if (body.email.length < 10) {
        requiredFields.push({
            email: "Entered email is not a valid email.",
        });
    }
    if (!body.phone) {
        requiredFields.push({phone: "title field required"});
    } else if (body.phone.length < 10) {
        requiredFields.push({
            phone: "Entered email is not a valid email.",
        });
    }

    const phoneExists = await User.findOne({phone: body.phone});
    const emailExists = await User.findOne({email: body.email});

    if (phoneExists) {
        requiredFields.push({phone: "Phone number already exit"});
    }
    if (emailExists) {
        requiredFields.push({email: "email already exit"});
    }

    if (requiredFields.length > 0) {
        return {
            status: 400,
            type: "Bad request",
            error: requiredFields,
        };
    }

    if (profileImage) {
        let imageData = profileImage.destination.replace("public/", "") + profileImage.filename;
        body["profileImage"] = imageData;
    }
    if (banner) {
        let imageData = banner.destination.replace("public/", "") + banner.filename;
        body["banner"] = imageData;
    }


    let user = new User(body);
    try {
        user = await user.save();
        return {
            status: 200,
            type: "success",
            user: user,
        };
    } catch (error) {
        return {
            status: 500,
            type: "error",
            error: "Internal server error.",
        };
    }
}

async function deleteUser(id) {
    try {
        const result = await User.findByIdAndDelete(id);

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

async function profileUpdate(body, id) {

    body['displayName'] = body.name;

    try {
        const user = await User.findByIdAndUpdate(id, body, {
            new: true,
        });
        Email.welcomeEmail(user);
        return {
            status: 200,
            type: "success",
            user: user,
        };
    } catch (e) {
        return {
            status: 400,
            type: "error",
            error: "Bad Request",
        };
    }
}

async function sendUserQueryEmail(title,message, id) {
    const userData = await User.findById(id);
    if (!message) {
        return {
            status: 400,
            type: "error",
            error: "Bad Request",
        };
    }
    try {
        if(title==="payment"){
            Email.paymentEmail(userData, message);
        }else if(title==="order"){
            Email.orderEmail(userData, message);
        }else if(title==="product"){
            Email.productEmail(userData, message);
        }else if(title==="other"){
            Email.otherEmail(userData, message);
        }else if(title==="legal"){
            Email.legalEmail(userData, message);
        }

        return {
            status: 200,
            type: "success",
            message:"Email sent successfully !"
        };
    } catch (e) {
        return {
            status: 400,
            type: "error",
            error: "Bad Request",
        };
    }
}


async function walletAddressUpdate(body, id) {
    try {
        const user = await User.findByIdAndUpdate(id, body, {
            new: true,
        });

        return {
            status: 200,
            type: "success",
            user: user,
        };
    } catch (e) {
        return {
            status: 400,
            type: "error",
            error: "Bad Request",
        };
    }
}

async function removeUser(user) {
    try {
        const userData = await User.updateOne({_id:user.id},{$set: {deleted: true}})
        return {
            status: 200,
            type: "success",
            user: userData,
        };
    } catch (e) {
        return {
            status: 400,
            type: "error",
            error: "Bad Request",
        };
    }
}


module.exports = {
    userDetails,
    userUpdate,
    adminDetails,
    adminUpdate,
    sellers,
    customers,
    addUser,
    deleteUser,
    topSellers,
    staffs,
    sellerDetails,
    profileUpdate,
    sendUserQueryEmail,
    walletAddressUpdate,
    removeUser
};
