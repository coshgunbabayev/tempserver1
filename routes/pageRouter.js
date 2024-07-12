const express = require("express");
const router = express.Router();
const {
    getIndexPage,
    getSignupPage,
    getLoginPage
} = require("../controllers/pageController");
const { authenticateUser } = require("../middlewares/authMiddleWare");

router.route("/")
    .get(authenticateUser, getIndexPage);

router.route("/signup")
    .get(getSignupPage);

router.route("/login")
    .get(getLoginPage);

module.exports = { router }