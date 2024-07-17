const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");

const authenticatePage = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.redirect("/login");
    };

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.redirect("/login");
    };

    const user = await User.findById(decoded.userId);

    if (!user) {
        return res.redirect("/login");
    };

    res.locals.localUser = user;

    next();
};

const authenticateAPI = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "User Not Found"
        })
    };

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "User Not Found"
        })
    };

    const user = await User.findById(decoded.userId);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User Not Found"
        })
    };

    res.locals.localUser = user;

    next();
};


module.exports = { authenticatePage, authenticateAPI };