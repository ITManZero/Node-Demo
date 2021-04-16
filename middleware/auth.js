const { isLoggedIn, logOut } = require("../auth");

const { Unauthorized, BadRequest, catchAsync } = require("../error");

const { SESSION_ABSOLUTE_TIMEOUT } = require("../config");

const { User } = require("../models/user");

exports.guest = (req, res, next) => {
  if (isLoggedIn(req)) {
    if (req.method === "POST")
      return next(new BadRequest("you are already logged in"));
    res.redirect("/");
  } else next();
};

exports.auth = (req, res, next) => {
  if (!isLoggedIn(req)) {
    if (req.method === "POST")
      return next(new Unauthorized("you must be logged in"));
    res.redirect(`/account/login?next=${req.originalUrl}`);
  } else next();
};

exports.verified = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const { email } = req.body;

  let user;
  if (id) user = await User.findById(id).select("verifiedAt");
  else user = await User.findOne({ email }).select("verifiedAt");

  if (user && user.verifiedAt)
    throw next(new BadRequest("Account already verified"));
  next();
});

exports.resetPassword = catchAsync(async (user, password) => {
  user.password = password;
  await user.save();
});

exports.active = catchAsync(async (req, res, next) => {
  if (isLoggedIn(req)) {
    const now = Date.now();
    const { createdAt } = req.session;

    console.log(createdAt);

    if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
      await logOut(req, res);

      return next(new Unauthorized("Session expired"));
    }
  }

  next();
});
