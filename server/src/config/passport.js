const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');

const { jwtSecret } = require('./vars');

exports.isAuthenticateSignup = (req, res, next) => {
  passport.authenticate('local-signup', async (err, user) => {
    try {
      if(err) {
        const error = new 
      }      
    } catch (error) {
      console.log(`------- error ------- isAuthenticateSignup`);
      console.log(error);
      console.log(`------- error ------- isAuthenticateSignup`);
      next(error)
    }
  })
}