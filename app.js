const express = require("express");
const session = require("express-session");
const { SESSION_OPTIONS } = require("./config");
const { home, verify, profile, account } = require("./routes");
const { errorHandler, active, notFound } = require("./middleware");

exports.createApp = (store) => {
  const app = express();

  app.use(express.json());

  app.use(session({ ...SESSION_OPTIONS, store }));

  app.use(home);

  app.use("/account", account);

  app.use("/profile", profile);

  app.use("/email", verify);

  // app.use(active);

  // app.use(reset)

  app.use(notFound);

  app.use(errorHandler);

  return app;
};
