const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
  },
};
