const newUser = {
  register(req, res) {
    res.render("register", {
      errors: req.flash("validationErrors"),
      //   errors: req.session.registrationErrors,
    });
  },
};

module.exports = newUser;
