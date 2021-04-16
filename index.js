const mongoose = require("mongoose");
const session = require("express-session");
const connectRedis = require("connect-redis");
const Redis = require("ioredis");
const {
  APP_ORIGIN,
  APP_PORT,
  REDIS_OPTIONS,
  MONGO_URI,
  MONGO_OPTIONS,
} = require("./config");
const { createApp } = require("./app");

(async () => {
  console.log(MONGO_URI);

  await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

  console.log("DB connected..");

  const RedisStore = connectRedis(session);

  const client = new Redis(REDIS_OPTIONS);

  const store = new RedisStore({ client });

  const app = createApp(store);

  app.listen(APP_PORT, () => console.log(APP_ORIGIN));
})();
