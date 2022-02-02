const Product = require("../models/Product");
const User = require("../models/User");

const SiteController = {
  // [GET] / home
  home: async (req, res) => {
    try {
      const products = await Product.find({});
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        res.render("home", { products, user });
      } else {
        res.render("home", { products, user: "" });
      }
    } catch (err) {
      return res.render("error", {
        err,
        message: "Xảy ra lỗi khi nhận dữ liệu từ server, xin thử lại",
      });
    }
  },

  // [GET] / detail
  detail: async (req, res, next) => {
    const product_slug = req.params.slug;
    const product = await Product.findOne({ slug: product_slug }).exec();
    if (req.user) {
      const user = await User.findOne({ _id: req.user });
      if (product) res.render("product-detail", { product, user });
      else next();
    } else {
      if (product) res.render("product-detail", { product, user: "" });
      else next();
    }
  },

  // [GET] / login
  login: (req, res) => {
    res.render("login", { message: "" });
  },
  // [GET] / register
  register: (req, res) => {
    res.render("register", { message: "" });
  },

  // [POST] / info/logout
  logout: async (req, res) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    const refreshToken = req.cookies.refresh_token;
    await User.updateOne({ refreshToken }, { refreshToken: "" });
    try {
      const products = await Product.find({});
      res.cookie("isLoggedIn", "false");
      res.redirect('/');
    } catch (err) {
      res.render("error", {
        err,
        message: "Có lỗi khi nhận dữ liệu từ server, xin thử lại",
      });
    }
  },

  async search(req, res) {
    const search = req.query.search;
    const products = await Product.find({
      name: {
        $regex: `.*${req.query.search}.*`,
        $options: "$i",
      },
    });
    if (req.user) {
      const user = await User.findOne({ _id: req.user });
      res.render("search", { products, user });
    } else {
      res.render("search", { products, user: "" });
    }
  },
};
module.exports = SiteController;
