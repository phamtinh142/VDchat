const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/vars');

exports.verifyJwtToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      return resolve(decoded);
    })
  });
}

exports.TokenCheckMiddleware = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    try {
      const decoded = await this.verifyJwtToken(token, jwtSecret);
      req.decoded = decoded;
      next();
    } catch (error) {
      console.log(`------- error ------- TokenCheckMiddleware`);
      console.log(error);
      console.log(`------- error ------- TokenCheckMiddleware`);
      return res.status(401).json({ message: 'Unauthorized access!' });
    }
  } else {
    return res.status(403).json({ message: 'No token provided!' });
  }
}