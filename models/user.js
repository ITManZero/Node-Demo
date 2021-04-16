const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createHash, createHmac, timingSafeEqual } = require("crypto");
const {
  BCRYPT_WORK_FACTOR,
  APP_SECRET,
  EMAIL_VERIFICATION_TIMEOUT,
  APP_ORIGIN,
} = require("../config");

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "email already exist"],
    lowercase: true,
  },
  // phone_number:{
  //     type: Number,
  //     unique: [true, 'Phone number already exist'],
  // },
  password: {
    type: String,
    minlength: 8,
  },
  verifiedAt: {
    type: Date,
  },
});

userSchema.methods.matchPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.verificationUrl = function () {
  const token = createHash("sha1").update(this.email).digest("hex");
  const expires = Date.now() + EMAIL_VERIFICATION_TIMEOUT;
  const url = `${APP_ORIGIN}/email/verify?id=${this.id}&token=${token}&expires=${expires}`;
  const signature = User.signVerificationUrl(url);
  return `${url}&signature=${signature}`;
};

userSchema.statics.signVerificationUrl = (url) =>
  createHmac("sha256", APP_SECRET).update(url).digest("hex");

userSchema.statics.hasValidVerificationUrl = (path, query) => {
  const url = `${APP_ORIGIN}${path}`;
  const original = url.slice(0, url.lastIndexOf("&"));
  const signature = User.signVerificationUrl(original);
  return (
    timingSafeEqual(Buffer.from(signature), Buffer.from(query.signature)) &&
    +query.expires > Date.now()
  );
};

const User = mongoose.model("User", userSchema, "users");

module.exports.User = User;
