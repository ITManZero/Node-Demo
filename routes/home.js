const router = require("express").Router();

router.route("/home").get((req, res, next) => {
  res.status(200).send("home");
});

router
  .route("/")
  .get((req, res, next) => {
    res.redirect("/home");
  })
  .post();

module.exports.home = router;
