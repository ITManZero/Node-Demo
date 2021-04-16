const { override } = require("joi");

class BadRequest extends Error {
  constructor(message = "Error Notification", statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
class Unauthorized extends Error {
  constructor(message = "Error Notification", statusCode = 401) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = {
  BadRequest,
  Unauthorized,
  catchAsync: (handler) => (...args) => handler(...args).catch(args[2]),
};
