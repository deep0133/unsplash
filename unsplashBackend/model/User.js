const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
}, {
    timestamps: true,
});

// Hash and salt the user password before saving to the database
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
});

// Compare the provided password with the stored hashed password
UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw err;
    }
};

UserSchema.methods.generateToken = async function () {
    const user = this;
    const jwtSecret = process.env.JWT_SECRET
    const token = await jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '15d' });

    return token;
};

module.exports = mongoose.model('user', UserSchema)