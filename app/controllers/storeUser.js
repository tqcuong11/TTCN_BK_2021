const User = require("../models/User.js");
const path = require("path");

const storeUser = {
  storeUser(req, res) {
    User.create(req.body, (error, user) => {
      //   res.render("login");
      res.redirect("/login");
    });
  },
};

module.exports = storeUser;
