const { User } = require("../models/user");
const { markAsVerified } = require("../auth");
const { verifyEmailSchema, emailSchema, validate } = require("../validation");
const { BadRequest, catchAsync } = require("../error");

exports.emailVerification = catchAsync(async (req, res, next) => {
  await validate(verifyEmailSchema, req.query);

  const { id } = req.query;

  const user = await User.findById(id).select("verifiedAt");

  const matchSignature = User.hasValidVerificationUrl(
    req.originalUrl,
    req.query
  );

  if (!user || !matchSignature) {
    throw next(new BadRequest("Invalid activation link"));
  }

  await markAsVerified(user);

  res.status(200).json({ status: "sucess", message: "verified" });
});

exports.verificationPage = async (req, res, next) => {
  res.json({
    route: "verify",
    details:
      " verificationPage with one button to confirm verification process",
  });
};

exports.resendPage = async (req, res, next) => {
  res.json({
    route: "resend",
    details: {
      form_details: "simple form contain one textfield ",
      input: "email",
      button: "send button",
      notes: "setting timer to send new link",
    },
  });
};

exports.resendVerificationLink = catchAsync(async (req, res) => {
  await validate(emailSchema, req.body);

  const { email } = req.body;

  const user = await User.findOne({ email }).select("email verifiedAt");

  if (user && !user.verifiedAt) {
    const link = user.verificationUrl();

    console.log(link);

    // await sendMail({
    //   to: email,
    //   subject: "Verify your email address",
    //   text: link,
    // });
  }

  res.json({
    message:
      "If your email address needs to be verified, you will receive an email with the activation link",
  });
});
