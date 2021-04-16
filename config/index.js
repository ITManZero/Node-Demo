const { APP_PROTOCOL, APP_HOSTNAME, APP_PORT, NODE_ENV } = require("./app");
module.exports = {
  ...require("./app"),
  ...require("./auth"),
  ...require("./db"),
  ...require("./session"),
  ...require("./cache"),
  APP_ORIGIN: `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`,
  IN_PROD: NODE_ENV === "production",
};
