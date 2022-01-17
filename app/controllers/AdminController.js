const Product = require("../models/Product");
const User = require("../models/User");

const AdminController = {
  // [GET] / home
  //   home: async (req, res) => {
  //     try {
  //       const products = await Product.find({});
  //       if (req.user) {
  //         const user = await User.findOne({ _id: req.user });
  //         res.render("home", { products, user });
  //       } else {
  //         res.render("home", { products, user: "" });
  //       }
  //     } catch (err) {
  //       return res.render("error", {
  //         err,
  //         message: "Xảy ra lỗi khi nhận dữ liệu từ server, xin thử lại",
  //       });
  //     }
  //   },

  // [GET] / login
  dashboard: (req, res) => {
    // res.render("admin", { message: "" });
    res.render("admin");
  },
};
module.exports = AdminController;
