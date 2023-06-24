const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
    CLOUDINARY_PRESET_KEY: process.env.CLOUDINARY_PRESET_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  },
};
