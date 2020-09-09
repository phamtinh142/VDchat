const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const httpStatus = require('http-status');

const User = require('../models/user.model');
const { jwtSecret } = require('./vars');
const APIError = require('../utils/APIError');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .lean()
    .exec((err, user) => {
      done(err, user);
    });
});

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    // Check email exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error();
      error.message = 'User not found';
      error.status = 404;
      return done(error);
    }

    // Check password
    const validatePassword = await user.isValidPassword(password);
    if (!validatePassword) {
      const error = new Error();
      error.message = 'Wrong password';
      error.status = 404;
      return done(error);
    }
    return done(null, user);
  } catch (error) {
    console.log('------- error ------- loginLocal');
    console.log(error);
    console.log('------- error ------- loginLocal');
    return done(error);
  }
}));

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, async (req, email, password, done) => {
  try {
    // Check email exists
    const user = await User.findOne({ email });
    if (user) {
      const error = new Error();
      error.message = 'Email exists already';
      error.status = 400;
      return done(error);
    }
    return done(null, req.body);
  } catch (error) {
    console.log('------- error ------- signupLocal');
    console.log(error);
    console.log('------- error ------- signupLocal');
    return done(error);
  }
}));

passport.use(new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
  try {
    // Check user exists
    const infoUser = await User.findOne({ _id: token.user._id }).lean();
    if (!infoUser) {
      const error = new Error();
      error.message = 'User not found!';
      error.status = 404;
      return done(error);
    }
    return done(null, infoUser);
  } catch (error) {
    console.log('------- error ------- signupLocal');
    console.log(error);
    console.log('------- error ------- signupLocal');
    return done(error);
  }
}));

const ADMIN = 'admin';
const USER = 'user';

const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const apiError = new APIError({
    message: err ? err.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
  });

  try {
    if (err || !user) throw err;
    await req.login(user, { session: false });
  } catch (error) {
    return next(apiError);
  }

  if (roles === USER) {
    if (user.role !== USER) {
      apiError.status = httpStatus.FORBIDDEN;
      apiError.message = 'Forbidden';
      return next(apiError);
    }
  } else if (!roles.includes(user.role)) {
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = 'Forbidden';
    return next(apiError);
  }

  req.user = user;

  return next();
};

exports.ADMIN = ADMIN;
exports.USER = USER;

exports.authorize = (roles) => (req, res, next) => passport.authenticate(
  'jwt',
  { session: false },
  handleJWT(req, res, next, roles),
)(req, res, next);
