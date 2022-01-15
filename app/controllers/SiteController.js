const Products = require("../models/Product");

const SiteController = {
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

  async search(req, res) {
    const search = req.query.search;
    const products = await Products.find({
      name: {
        $regex: `.*${req.query.search}.*`,
        $options: "$i",
      },
    });
    res.render("search", { products });
  },
};

module.exports = SiteController;
