const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

const EmployeeController = {
  manageBills: async (req, res) => {
    try {
      if (req.user) {
        let bills = await Order.find({}).populate("user_id").sort("status");
        if (req.query.status && req.query.status.length) {
          bills = bills.filter((bill) => bill.status.toString() === req.query.status);
        }

        for (let i = 0; i < bills.length; i++) {
          for (let j = 0; j < bills[i].order.length; j++) {
            product = await Product.findOne({ _id: bills[i].order[j].product_id });
            bills[i].order[j].product = product;
          }
        }
        const user = await User.findOne({ _id: req.user });

        res.render("employee/hoadon", { user, bills });
      } else {
        res.render("employee/hoadon", { user: "" });
      }
    } catch (error) {}
  },
  mangeOrders: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const status = req.query.status;
      if (status === "active") {
        const userId = req.query.userId;
        await Order.updateOne({ _id: orderId }, { status: 1 });
        const order = await Order.findOne({ _id: orderId });
        const user = await User.findOne({ _id: userId });
        let products = user.products;
        order.order.map((order) => {
          if (!products.includes(order.product_id)) {
            products.push(order.product_id);
          }
        });
        await User.updateOne({ _id: userId }, { products: products });
        res.json({ mes: "done" });
      } else if (status === "cancel") {
        await Order.updateOne({ _id: orderId }, { status: -1 });
        res.json({ mes: "done" });
      }
    } catch (err) {
      return res.render("error", {
        err,
        message: "Xảy ra lỗi khi nhận dữ liệu từ server, xin thử lại",
      });
    }
  },
};
module.exports = EmployeeController;
