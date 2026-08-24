const streamifier = require("streamifier");
const { v2: cloudinary } = require("cloudinary");
const config = require("../config");

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
});

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "uploads"
            },
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        streamifier
            .createReadStream(fileBuffer)
            .pipe(stream);
    });
};

module.exports = uploadToCloudinary;