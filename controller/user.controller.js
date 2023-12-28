const userService = require("../services/user.service");

async function userData(req, res, next) {
    const response = await userService.userDetails(
        req.user
    );
    return res.status(response.status).json(response);
}

async function users(req, res, next) {
    const response = await userService.users({
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    });
    return res.status(response.status).json(response);
}

async function addUser(req, res, next) {
    const {body} = req;
    const profileImage = req.files.profileImage ? req.files.profileImage[0] : null;
    const banner = req.files.banner ? req.files.banner[0] : null;
    const response = await userService.addUser(body, profileImage, banner);
    return res.status(response.status).json(response);
}

async function userUpdate(req, res, next) {
    const {body} = req;
    const profileImage = req.files.profileImage ? req.files.profileImage[0] : null;
    const banner = req.files.banner ? req.files.banner[0] : null;
    const response = await userService.userUpdate(body, profileImage, banner, req.params.id);

    return res.status(response.status).json(response);
}

async function deleteUser(req, res, next) {

    const response = await userService.deleteUser(req.params.id);

    return res.status(response.status).json(response);
}

module.exports = {
    userData,
    userUpdate,
    users,
    addUser,
    deleteUser
};
