require("dotenv").config();
const Product = require("../models/Product");
const User = require("../models/User");
const argon2 = require("argon2");
const path = require("path");
const fileUpload = require("express-fileupload");

const AdminController = {
  // [GET] / login
  dashboard: async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        const employees = await User.find({ role_id: 1 });
        res.render("admin", { user,employees });
      } else {
        res.redirect("/");
      }
    } catch (err) {
      return res.render("error", {
        err,
        message: "Xảy ra lỗi khi nhận dữ liệu từ server, xin thử lại",
      });
    }
  },


  // [GET] / list of products
  listProducts: async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        res.render("products", { user });
      } else {
        res.render("products", { user: "" });
      }
    } catch (error) {}
  },

  
  //
  newEmployee: async (req, res) => {
    const user = await User.findOne({ _id: req.user });
    res.render("newEmployee", { user });
  },
  // [POST] / add employee
  addEmployee: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      // check for existing user
      const employee = await User.findOne({ email });
      if (employee) {
        return res.render("newEmployee", { message: "Email đã tồn tại! Vui lòng đăng nhập hoặc dùng email khác" });
      } else {
        //   all good
        const hashedPassword = await argon2.hash(password);
        await User.create({
          full_name: req.body.full_name,
          email: req.body.email,
          password: hashedPassword,
          role_id: 1,
        });
        return res.redirect("/admin/employees");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).render("error", {
        err,
        message: "Xảy ra lỗi trong quá trình đăng ký, xin thử lại",
      });
    }
  },

  //
  newProduct: async (req, res) => {
    const user = await User.findOne({ _id: req.user });
    res.render("newProduct", { user });
  },
  // [POST] / add employee
  addProduct: (req, res) => {
    res.redirect("/admin/products");
  },

  manageCustomers: async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        res.render("customers", { user });
      } else {
        res.render("customers", { user: "" });
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
