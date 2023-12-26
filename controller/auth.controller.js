const authService = require("../services/auth.service");
const TypedError = require("../helper/ErrorHandler");

async function login(req, res, next) {
    const {email, password} = req.body;

    const response = await authService.userLogin(
        email,
        password
    );

    return res.status(response.status).json(response);
}

async function register(req, res, next) {
    const {name, companyName, email, phone, password} = req.body;

    const response = await authService.userRegister(
        name,
        companyName,
        email,
        phone,
        password
    );

    return res.status(response.status).json(response);
}

async function sendOTP(req, res, next) {
    const {email} = req.body;

    const response = await authService.sendOTP(
        email,
    );
    return res.status(response.status).json(response);

}

async function verifyOTP(req, res, next) {
    const {email, otp} = req.body;

    const response = await authService.verifyOTP(
        email,
        otp
    );
    return res.status(response.status).json(response);
}

module.exports = {login, sendOTP, register, verifyOTP};
