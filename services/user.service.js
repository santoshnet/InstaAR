const User = require("../models/User");

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

async function users(params) {
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


    return {
        status: 200,
        type: "success",
        user: user,
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


module.exports = {
    userDetails,
    userUpdate,
    addUser,
    deleteUser,
    users
};
