const { check } = require('express-validator');
const { registerUser, loginUser, profile } = require('../controller/userController');
const authRouter = require('express').Router();
const { Authorization } = require('../middleware/Authorization')

authRouter.get('/me', Authorization, profile)

// User login or register with Local
authRouter.post(
    '/register',
    [
        check('email').isEmail().withMessage('Invalid email address.'),
        check('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long.'),
    ],
    registerUser
);
// User login or register with Local
authRouter.post(
    '/login',
    [
        check('email').isEmail().withMessage('Invalid email address.'),
        check('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long.'),
    ],
    loginUser
);

module.exports = authRouter