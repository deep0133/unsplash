const path = require("path");
const DataUriParser = require('datauri/parser.js');
const axios = require('axios');

// From image to file

async function getDataUri(buffer, extension) {
    const parser = new DataUriParser();
    return parser.format(extension, buffer); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}

async function imageUrlToDataURI(imageUrl) {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const extension = path.extname(imageUrl);
        return await getDataUri(response.data, extension);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    imageUrlToDataURI
};
