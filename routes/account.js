const router = require("express").Router();
const {
  login,
  loginForm,
  signup,
  signupForm,
  logout,
} = require("../controller");
const { guest, auth } = require("../middleware");

router.route("/login").post(guest, login);

router.route("/signup").post(guest, signup);

router.route("/logout").get(auth, logout);

module.exports.account = router;
