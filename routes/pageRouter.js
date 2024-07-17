const express = require("express");
const router = express.Router();
const {
    getIndexPage,
    getSignupPage,
    getLoginPage
} = require("../controllers/pageController");
const { authenticatePage } = require("../middlewares/authMiddleWare");

router.route("/")
    .get(authenticatePage, getIndexPage);

router.route("/signup")
    .get(getSignupPage);

router.route("/login")
    .get(getLoginPage);

module.exports = { router }