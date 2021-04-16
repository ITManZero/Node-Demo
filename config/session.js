const ONE_HOUR = 1000 * 60 * 60;

const THIRTY_MINUTES = ONE_HOUR / 2;

const SIX_HOURS = ONE_HOUR * 6;

const { env } = process;

const {
  SESSION_SECRET = "cDeThFJxxp0MrnP7ndJVzGRVGcoYNkRL",
  SESSION_NAME = "sid",
  SESSION_IDLE_TIMEOUT = THIRTY_MINUTES,
} = env;

exports.SESSION_NAME = SESSION_NAME;

exports.SESSION_ABSOLUTE_TIMEOUT = +(env.SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS);

exports.SESSION_OPTIONS = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: false,
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};
