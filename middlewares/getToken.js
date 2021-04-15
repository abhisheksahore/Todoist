const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");


module.exports = function(req, res, next) {
    try {
        const token = req.headers['token'];
    
        const auth = jwt.verify(token, SECRET_KEY);
        console.log(auth);
        req.username = auth.username;
        req.password = auth.password;
        next();
    } catch (error) {
        console.error(error)
        res.status(400).json({message: "access denied"});
    }
}