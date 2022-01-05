const Products = require("../models/Product");

const SiteControler = {
  home: async (req, res, next) => {
    const products = await Products.find({});
    // console.log(products);
    if (products) res.render("home", { products });
    else next();
  },
};

module.exports = SiteControler;
