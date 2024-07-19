const { Post } = require("../models/postModel")

const getPosts = async (req, res) => {
    const posts = await Post.find({ to: null }).populate("user")
    console.log(posts)

    res.status(200).json({
        success: true,
        posts
    })
}

const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.create({
            user: req.user._id,
            text
        });

        res.status(201).json({
            success: true
        });
    } catch (err) {
        let errors = new Object();

        if (err.name === "ValidationError") {
            Object.keys(err.errors).forEach(key => {
                errors[key] = err.errors[key].message;
            });
        };

        res.status(400).json({
            success: false,
            errors
        });
    };
}


module.exports = {
    getPosts,
    createPost
}