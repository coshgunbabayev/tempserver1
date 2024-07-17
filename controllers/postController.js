const { Post } = require("../models/postModel")

const getPosts = async (req, res) => {
    const posts = await Post.find({ to: null })

    res.status(200).json({
        success: true,
        posts
    })
}


module.exports = {
    getPosts
}