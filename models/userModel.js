const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const {
    isValidPassword
} = require("../modules/isValid");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name area is required"]
    },

    surname: {
        type: String,
        required: [true, "Surname area is required"]
    },

    username: {
        type: String,
        required: [true, "Username area is required"],
        unique: true,
        validate: [
            (value) => {
                return !value.includes(" ");
            },
            "Username cannot contain spaces"
        ]
    },

    email: {
        type: String,
        required: [true, "Email area is required"],
        unique: true,
        validate: [validator.isEmail, "Valid email is required"]
    },

    password: {
        type: String,
        required: [true, "Password area is required"],
        minLength: [8, "Password is so short"],
        validate: [isValidPassword, "Invalid password. Password must contain at least one number, one lowercase letter, one uppercase letter, and should not contain spaces."]
    }
});

userSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return console.log(err.message);
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", userSchema);

module.exports = { User };