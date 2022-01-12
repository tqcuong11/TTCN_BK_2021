const bcrypt = require("bcrypt");
const User = require("../models/User");
const path = require("path");

const authUser = {
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

  storeUser(req, res) {
    User.create(req.body, (error, user) => {
      if (error) {
        const validationErrors = Object.keys(error.errors).map((key) => error.errors[key].message);
        req.flash("validationErrors", validationErrors);
        return res.redirect("/register");
      }
      res.redirect("/login");
    });
  },
};

//export
module.exports = authUser;
