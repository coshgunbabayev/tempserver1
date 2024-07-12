const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
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

module.exports = { authenticateUser };