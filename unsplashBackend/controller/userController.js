const { validationResult } = require("express-validator");
const User = require('../model/User');
const { ErrorHandler } = require('../utils/ErrorHandler')

// Get Profile
const profile = async (req, res, next) => {
    try {
        res.json({ message: 'User Profile', user: req.user })
    } catch (error) {
        return next(error.message, 500)
    }
}

// User registration route
const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ErrorHandler("All fields Required", 204));
        }

        const { name, email, password } = req.body;

        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("User Already Exist", 400));
        }

        // Create a new user with the provided data
        const newUser = new User({ name, email, password });

        await newUser.save();
        const token = await newUser.generateToken()

        res.status(201).json({ success: true, message: 'User registered successfully', token });
    } catch (err) {
        return next(new ErrorHandler("Failed to register user", 409));
    }
}

// User Login route
const loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ErrorHandler("All fields Required", 422));
        }

        const { email, password } = req.body;

        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return next(new ErrorHandler("User Not Found", 409));
        }

        const comparePassword = await existingUser.comparePassword(password)

        if (!comparePassword) return next(new ErrorHandler("Credentials Invalid", 401))

        const token = await existingUser.generateToken()

        res.status(200).json({ success: true, message: 'Login successfully', token });
    } catch (err) {
        return next(new ErrorHandler("Failed to Login user", 409));
    }
}

module.exports = {
    profile,
    registerUser,
    loginUser
}