const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { ErrorHandler } = require('../utils/ErrorHandler');


async function Authorization(req, res, next) {
    try {
        const jwtSecret = process.env.JWT_SECRET

        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                message: 'No Authorization Header'
            })
        }

        const token = authorization.split('Bearer ')[1];
        if (!token) {
            return next(new ErrorHandler('Invalid Token Format', 401));
        }

        const decode = jwt.verify(token, jwtSecret);
        const id = decode

        let user = await User.findOne({ _id: id.id })

        if (!user) return next(new ErrorHandler('Authorized First', 401))
        user = user.toJSON()
        delete user['password']
        req.user = user
        next()
    } catch (error) {
        return next(new ErrorHandler(error.message, 401))
    }
}

module.exports = { Authorization }