const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { ObjectId } = require("mongodb")
const validator = require("validator");


const postSchema = new Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },

    to: {
        type: ObjectId,
        ref: "Post",
        default: null
    },

    text: {
        type: String,
        required: [true, "text area is required"]
    }
});



const Post = mongoose.model("Post", postSchema);

module.exports = { Post };