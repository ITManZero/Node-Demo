const { User } = require("../models/user");
const { BadRequest, catchAsync } = require("../error");

exports.profileInfo = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  if (!id) res.redirect("/notfound");

  const user = await User.findById(id);

  if (!user) throw new BadRequest("user not found");

  res.status(200).json({
    status: "sucess-accessing-profile",
    message: user,
  });
});
