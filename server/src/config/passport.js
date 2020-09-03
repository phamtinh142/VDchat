const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/user.model');
const { jwtSecret } = require('./vars');

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
