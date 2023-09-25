const { Router } = require('express');
const photoRouter = Router();
const { Authorization } = require('../middleware/Authorization.js');
const { check } = require('express-validator');
const { getAllPhotos, addPhoto, deletePhoto } = require('../controller/photoController.js');

// Get all photoRoutes
photoRouter.get('/', getAllPhotos)

// Create a new photoRoute
photoRouter.post('/add', Authorization, [
    check('label').not().isEmpty().withMessage('Image label required.'),
    check('imageUrl').not()
        .isEmpty()
        .withMessage('Image url is required'),
], addPhoto)

// Delete photoRoute By ID
photoRouter.delete('/delete/:id', Authorization, deletePhoto)

module.exports = photoRouter 