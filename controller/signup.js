const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { registerSchema, validate } = require("../validation");
const { logIn } = require("../auth");
const { BadRequest, catchAsync } = require("../error");

exports.signup = catchAsync(async (req, res, next) => {
  await validate(registerSchema, req.body);

  const hashed = await bcrypt.hash(req.body.password, 10);

  let user = await User.findOne({ email: req.body.email });

  if (user) throw new BadRequest("already exist");

  user = await new User({
    email: req.body.email,
    password: hashed,
  });

  user.save();

  logIn(req, user._id);

  const link = user.verificationUrl();

  console.log(link);

  // await sendMail({
  //   to: email,
  //   subject: 'Verify your email address',
  //   text: link
  // })

  res.status(200).json({
    status: "sucess",
    message: user,
  });
});

exports.signupForm = (req, res, next) => {
  res.json({
    message: "success",
    details: "signup form",
  });
};
