module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  PORT: process.env.PORT || 8000,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
