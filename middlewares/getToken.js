const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");


module.exports = function(req, res, next) {
    const token = req.headers['token'];

    const auth = jwt.verify(token, SECRET_KEY);
    console.log(auth);

    next(auth);
}