const express = require("express");
const router = express.Router();
const {
    getPosts
} = require("../controllers/postController");
const { authenticateAPI } = require("../middlewares/authMiddleWare");

router.route("/")
    .get(authenticateAPI, getPosts)
    // .post(authenticateAPI, createPost)


module.exports = { router }