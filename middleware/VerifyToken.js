const jwt = require("jsonwebtoken");
const TypedError = require('../helper/ErrorHandler')


const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["x-access-token"] || req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            let err = new TypedError('token', 401, 'invalid_token', {
              message: "Token is not valid"
            })
            return next(err)
          } else {
            //bind on request
            req.user = user;
            next()
          }
    });
  } else {
    let err = new TypedError('token', 401, 'invalid_token', {
        message: "Token is not Provided"
      })
      return next(err)
  }
};

module.exports = verifyToken;
