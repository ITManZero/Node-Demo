const router = require("express").Router();
const {
  emailVerification,
  verificationPage,
  resendVerificationLink,
  resendPage,
} = require("../controller");

const { auth, verified } = require("../middleware");

router
  .route("/verify")
  .post(auth, verified, emailVerification)
  .get(auth, verified, verificationPage);

router
  .route("/resend")
  .post(auth, verified, resendVerificationLink)
  .get(auth, verified, resendPage);

module.exports.verify = router;
