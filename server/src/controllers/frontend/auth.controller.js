const { validationResult } = require('express-validator/check');
const passport = require('passport');

exports.login = async (req, res) => {
  console.log(`------- 'test' ------- login`);
  console.log('test');
  console.log(`------- 'test' ------- login`);
  return res.json({ user: 'login' });
}

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed!');
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }
  try {
    passport.authenticate('local-signup', async (error, user) => {
      try {
        
      } catch (error) {
        
      }
    })
  } catch (error) {
    next(new Error(error));
  }
}