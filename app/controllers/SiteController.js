const Products = require("../models/Product");

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
};

module.exports= SiteControler;
