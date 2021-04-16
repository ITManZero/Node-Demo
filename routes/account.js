const router = require("express").Router();
const {
  login,
  loginForm,
  signup,
  signupForm,
  logout,
} = require("../controller");
const { guest, auth } = require("../middleware");

router.route("/login").post(guest, login).get(guest, loginForm);

router.route("/signup").post(guest, signup).get(guest, signupForm);

router.route("/logout").get(auth, logout);

module.exports.account = router;
