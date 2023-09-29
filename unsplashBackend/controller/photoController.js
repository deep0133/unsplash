const { validationResult } = require('express-validator')
const Photo = require('../model/Photo')
const { ErrorHandler } = require('../utils/ErrorHandler')
const { imageUrlToDataURI } = require('../utils/dataUri')
const User = require('../model/User')
const cloudinary = require('cloudinary').v2

const getAllPhotos = async (req, res, next) => {
    try {
        const photos = await Photo.find({})
        res.json({ message: 'all photos', photos })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}
const addPhoto = async (req, res, next) => {
    try {

        // ------------------ Pending ----------------------------- 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ErrorHandler("All fields Required", 422));
        }

        const { imageUrl, label } = req.body

        const fileUri = await imageUrlToDataURI(imageUrl)

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(fileUri.content, {
            folder: 'unsplash' // Replace with your desired folder
        });

        let photos = await Photo.findOne({ userId: req.user._id });

        if (!photos) {
            photos = await new Photo({
                userId: req.user._id,
                imageUrl: {
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                    label,
                },
            })
        }
        else {
            photos.imageUrl.push({
                public_id: result.public_id,
                secure_url: result.secure_url,
                label
            })
        }
        photos = await photos.save()

        res.status(200).json({ message: "New Photo Added", photos })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}
const deletePhoto = async (req, res, next) => {
    try {
        const photoId = req.params.id;

        // Find the user's photo document
        const photo = await Photo.findOne({ userId: req.user._id });

        if (!photo) {
            return next(new ErrorHandler("You are not owner of this image", 404))
        }

        const user = await User.findOne({ _id: req.user._id })

        if (!req.body.password) return next(new ErrorHandler("Password Required", 400))

        // Checking Password:
        const comparepassword = await user.comparePassword(req.body.password)

        if (!comparepassword) return next(new ErrorHandler("Incorrect password", 404))

        // Find the index of the image URL to be deleted
        const indexToDelete = photo.imageUrl.findIndex(image => image._id.equals(photoId));

        if (indexToDelete === -1) {
            return next(new ErrorHandler("Photo not found", 404))
        }

        await cloudinary.uploader.destroy(photo.imageUrl[indexToDelete].public_id);

        // Remove the image URL from the array
        photo.imageUrl.splice(indexToDelete, 1);

        // Save the updated photo document
        await photo.save();

        res.status(200).json({
            message: "Image Deleted Successfully",
            photo: photo
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};

module.exports = {
    getAllPhotos,
    addPhoto,
    deletePhoto
}