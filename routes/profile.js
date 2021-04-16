const router = require("express").Router();

const { profileInfo } = require("../controller");

const { auth } = require("../middleware");

router.route("/").get(auth, profileInfo);

module.exports.profile = router;
