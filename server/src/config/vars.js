module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationMinutes: process.env.JWT_EXPIRATION_MINUTES,
  mongoUri: process.env.MONGO_URI
}