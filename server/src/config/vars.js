require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationMinutes: process.env.JWT_EXPIRATION_MINUTES,
  mongoUri: process.env.MONGO_URI,
  avatarDirectory: process.env.AVATAR_DIRECTORY,
  photoDirectory: process.env.PHOTOS_DIRECTORY,
  fileDirectory: process.env.FILE_DIRECTORY,
  staticURL: process.env.STATIC_URL,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
}