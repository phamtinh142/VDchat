const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/user.model');
const { jwtSecret, jwtExpirationMinutes } = require('../../config/vars');

exports.login = async (req, res, next) => {
  // Check validate email and password
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed!');
    error.statusCode = 422;
    error.data = errors.array();

    return next(error);
  }

  passport.authenticate('signup', async (err, user, info) => {
    try {
      if(err) {
        const error = new Error('An Error occured');
        return next(error);
      }

      if(!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }

      req.login(user, {session: false}, async (error) => {
        if(error) return next(error);

        const body = {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
        }
        const token = jwt.sign({ user: body }, jwtSecret, { expiresIn: jwtExpirationMinutes });

        return res.status(200).json({ token });
      })
    } catch (error) {
      console.log(`------- error ------- login`);
      console.log(error);
      console.log(`------- error ------- login`);
      res.json({ status: false, error });
    }
  });
}

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed!');
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  passport.authenticate('signup', async (err, user, info) => {
    try {
      if(err) {
        const error = new Error('An Error occured');
        return next(error);
      }

      if(!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }

      req.login(user, {session: false}, async (error) => {
        if(error) return next(error);

        const body = {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
        }
        const token = jwt.sign({ user: body }, jwtSecret, { expiresIn: jwtExpirationMinutes });

        return res.status(200).json({ token });
      })
    } catch (error) {
      console.log(`------- error ------- login`);
      console.log(error);
      console.log(`------- error ------- login`);
      return next(error);
    }
  });
}