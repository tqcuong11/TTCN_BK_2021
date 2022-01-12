const User = require("../models/User.js");
const path = require("path");

const storeUser = {
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

module.exports = storeUser;
