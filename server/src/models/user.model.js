const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { env } = require('../config/vars');

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  userName: { type: String },
  email: { type: String, unique: true },
  password: String,
  sex: Number,
  birthDay: Date,
  tokens: Array,
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const rounds = env === "test" ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.pre("update", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const rounds = env === "test" ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;