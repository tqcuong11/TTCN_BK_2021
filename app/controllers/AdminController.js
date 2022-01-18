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
  dashboard: async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        res.render("admin", { user });
      } else {
        res.render("admin", { user: "" });
      }
    } catch (error) {}
  },

  manageProducts: async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        res.render("sanpham", { user });
      } else {
        res.render("sanpham", { user: "" });
      }
    } catch (error) {}
  },

  manageStaffs: async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        res.render("nhanvien", { user });
      } else {
        res.render("nhanvien", { user: "" });
      }
    } catch (error) {}
  },

  manageCustomers: async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        res.render("khachhang", { user });
      } else {
        res.render("khachhang", { user: "" });
      }
    } catch (error) {}
  },

  manageBills: async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        res.render("hoadon", { user });
      } else {
        res.render("hoadon", { user: "" });
      }
    } catch (error) {}
  },
};
module.exports = AdminController;
