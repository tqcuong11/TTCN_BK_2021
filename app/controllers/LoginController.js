const Admin = require("../models/Admin");

class LoginController {
  index(req, res) {
    res.render("layouts/login");
  }
  async store(req, res, next) {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username: username }).exec();

    if (user) {
      const password = await Admin.findOne({ password: password }).exec();
      if (password) res.redirect("/admin");
      else res.redirect("back");
    } else res.redirect("back");
  }
}
module.exports = new LoginController();
