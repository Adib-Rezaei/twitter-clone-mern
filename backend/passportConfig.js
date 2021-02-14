const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy({usernameField: "displayName", passwordField: "password"}, (displayName, password, done) => {
      User.findOne({ displayName: displayName }, (err, user) => {
        if (err) throw err;
        if (!user) {
          return done(null, false);}
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        _id: user._id,
        displayName: user.displayName,
        username: user.username,
        avatar_url: user.avatar_url,
      };
      cb(err, userInformation);
    });
  });
};
