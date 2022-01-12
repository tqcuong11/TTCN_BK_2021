const bcrypt = require("bcrypt");
const User = require("../models/User");

const loginUser = {
  loginUser(req, res) {
    const { username, password } = req.body;
    User.findOne({ username: username }, (error, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            req.session.userId = user._id;
            res.redirect("/");
          } else {
            res.redirect("/login");
          }
        });
      } else {
        res.redirect("/login");
      }
    });
  },
};

//export
module.exports = loginUser;
