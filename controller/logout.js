const { logOut } = require("../auth");

const { catchAsync } = require("../error");

exports.logout = catchAsync(async (req, res, next) => {
  await logOut(req, res);
  res.redirect("/account/login");
});
