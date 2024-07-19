const express = require("express");
const router = express.Router();
const {
    getPosts,
    createPost

} = require("../controllers/postController");
const { authenticateAPI } = require("../middlewares/authMiddleWare");

router.route("/")
    .get(authenticateAPI, getPosts)
    .post(authenticateAPI, createPost)


module.exports = { router }