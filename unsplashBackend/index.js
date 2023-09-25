const express = require('express');
const app = express();
const authRouter = require('./route/userRoute')
const photoRouter = require('./route/photoRoute')
const { ErrorMiddleware } = require('./middleware/Error');
const cloudinary = require("cloudinary").v2
const cors = require('cors');
const dotenv = require("dotenv")


// config
dotenv.config({ path: "./config/config.env" })
require("./config/db")

const PORT = process.env.PORT || 3000;

// cloudinarys setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const frontendUrl = process.env.FRONTEND_URL
const allowedOrigins = [frontendUrl];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
};


// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Use the cors() middleware for regular requests
app.use(cors(corsOptions));



// Routes
app.use('/auth', authRouter)
app.use('/photos', photoRouter)


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on Port :`, PORT);
});


// Error Handling
app.use(ErrorMiddleware)