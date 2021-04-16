const { User } = require("../models/user");

const { loginSchema, validate } = require("../validation");

const { logIn } = require("../auth");

const { BadRequest, catchAsync } = require("../error");

exports.login = catchAsync(async (req, res, next) => {
  await validate(loginSchema, req.body);

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password, user.password)))
    throw new BadRequest("incorrect email or password");

  logIn(req, user.id);

  const nextRoute = req.query.next || "/";

  res.redirect(nextRoute);

  // res.status(200).json({
  //   status: "sucess",
  //   message: user,
  // });
});

exports.loginForm = (req, res, next) => {
  res.json({
    message: "success",
    details: "login form",
  });
};
