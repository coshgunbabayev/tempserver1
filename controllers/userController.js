const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");

const createUser = async (req, res) => {
    try {
        const { name, surname, username, email, password } = req.body;

        const user = await User.create({
            name,
            surname,
            username,
            email,
            password
        });

        res.status(201).json({
            success: true
        });
    } catch (err) {
        let errors = new Object();

        if (err.name == "ValidationError") {
            Object.keys(err.errors).forEach(key => {
                errors[key] = err.errors[key].message
            });
        };

        if (err.name == "MongoServerError" && err.code == 11000) {
            if (err.keyPattern.username) {
                errors.username = "Username is used";
            };

            if (err.keyPattern.email) {
                errors.email = "Email is used";
            };
        };

        res.status(400).json({
            success: false,
            errors
        });
    };
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({
            success: false,
            errors: {
                username: "Username is incorrect",
            }
        });
    };

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.cookie("token", token);

        res.status(200).json({
            success: true
        });

    } else {
        res.status(400).json({
            success: false,
            errors: {
                password: "Password is incorrect",
            }
        })
    };
};

module.exports = {
    createUser,
    loginUser
};