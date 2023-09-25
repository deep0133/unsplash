const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    imageUrl: [{
        public_id: String,
        secure_url: String,
        label: String
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('photo', PhotoSchema)