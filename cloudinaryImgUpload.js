const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: "dab32zovf",
    api_key: "782239468333299",
    api_secret: "JxgH_NHhtB3WkAsAqtIYrO4d0n8",
});

const uploadToCloudinary = async (imagePath) => {
    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath);
        return result;
      } catch (error) {
        console.error(error);
      }
}

module.exports = uploadToCloudinary