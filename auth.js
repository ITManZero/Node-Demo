const { SESSION_NAME } = require("./config");

exports.isLoggedIn = (req) => req.session.userId;

exports.logIn = (req, userId) => {
  req.session.userId = userId;
  req.session.createdAt = Date.now();
};

exports.logOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);

      res.clearCookie(SESSION_NAME);

      resolve();
    });
  });

exports.markAsVerified = async (user) => {
  user.verifiedAt = new Date();
  await user.save();
};

// exports.resetPassword = async (user, password) => {
//   user.password = password
//   await user.save()
// }
