const User = require("../models/User");
const Product = require("../models/Product");

const CartController = {
  index: async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        let products = [];
        if (user.cart.length !== 0) {
          for (let index = 0; index < user.cart.length; index++) products.push(await Product.findOne({ _id: user.cart[index] }));
        }
        user.cart = products;
        res.render("cart", { user });
      } else {
        const user = {};
        let cart = req.cookies.cart;
        console.log(cart);
        let products = [];
        if (cart) {
          cart = JSON.parse(cart);
          for (let index = 0; index < cart.length; index++) products.push(await Product.findOne({ _id: cart[index] }));
        }
        user.cart = products;
        // console.log(user);
        res.render("cart", { user });
      }
    } catch (error) {}
  },
  addProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      if (req.user) {
        await User.updateOne({ _id: req.user }, { $addToSet: { cart: [productId] } });
        res.redirect("back");
      } else {
        res.redirect("back");
      }
    } catch (error) {}
  },
  delete: async (req, res) => {
    try {
      const productId = req.params.id;
      if (req.user) {
        await User.updateOne({ _id: req.user }, { $pull: { cart: { $in: [productId] } } });
        res.redirect("back");
      } else {
        res.redirect("back");
      }
    } catch (error) {}
  },
};

module.exports = CartController;
