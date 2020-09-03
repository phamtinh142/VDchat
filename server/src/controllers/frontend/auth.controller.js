const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { jwtSecret, jwtExpirationMinutes } = require('../../config/vars');
const User = require('../../models/user.model');

exports.login = async (req, res, next) => {
  // Check validate login
  const validateErrors = validationResult(req);
  if (!validateErrors.isEmpty()) {
    const error = new Error();
    error.statusCode = 400;
    error.data = validateErrors.array();
    return next(error);
  }

  return passport.authenticate('local-login', { session: false }, async (err, user) => {
    try {
      if (err) {
        return next(err);
      }

      return req.login(user, { session: false }, async (loginError) => {
        if (loginError) {
          const error = new Error();
          error.message = 'Something is not right';
          error.statusCode = 400;
          return next(error);
        }

        const body = {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
        };
        const token = jwt.sign(
          { user: body },
          jwtSecret,
          { expiresIn: jwtExpirationMinutes },
        );

        return res.status(200).json({ token });
      });
    } catch (error) {
      console.log('------- error ------- login');
      console.log(error);
      console.log('------- error ------- login');
      return res.json({ status: false, error });
    }
  })(req, res, next);
};

exports.signup = async (req, res, next) => {
  // Check validate signup
  const validateErrors = validationResult(req);
  if (!validateErrors.isEmpty()) {
    const error = new Error();
    error.status = 400;
    error.data = validateErrors.array();
    return next(error);
  }

  return passport.authenticate('local-signup', { session: false }, async (err, user) => {
    try {
      if (err) {
        return next(err);
      }

      // Save user
      const saveUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        password: user.password,
      });
      await saveUser.save();

      return req.login(user, { session: false }, async (loginErr) => {
        if (loginErr) {
          const error = new Error();
          error.message = 'Something is not right';
          error.statusCode = 400;
          return next(error);
        }

        const body = {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
        };

        const token = jwt.sign(
          { user: body },
          jwtSecret,
          { expiresIn: jwtExpirationMinutes },
        );
        return res.status(200).json({ token });
      });
    } catch (error) {
      console.log('------- error ------- login');
      console.log(error);
      console.log('------- error ------- login');
      return next(error);
    }
  })(req, res, next);
};
