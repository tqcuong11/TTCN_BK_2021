const Products = require("../models/Product");
const Admin = require("../models/Admin");

const SiteControler = {
  home: async (req, res, next) => {
    const products = await Products.find({});
    if (products) res.render("home", { products });
    else next();
  },

  detail: async (req, res, next) => {
    const product_slug = req.params.slug;
    const product = await Products.findOne({ slug: product_slug }).exec();
    if (product) res.render("product-detail", { product });
    else next();
  },

  login(req, res) {
    res.render("login");
  },

  register(req, res) {
    res.render("register");
  },
  // async store(req, res, next) {
  //   const { username, password } = req.body;
  //   const user = await Admin.findOne({ username: username }).exec();

  //   if (user) {
  //     const password = await Admin.findOne({ password: password }).exec();
  //     if (password) res.redirect("/admin");
  //     else res.redirect("back");
  //   } else res.redirect("back");
};

module.exports = SiteControler;
