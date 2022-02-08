const Product = require("../models/Product");
const User = require("../models/User");
const Order=require("../models/Order");

const employeeController = {
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
  // POST: home
  getProduct: async (req,res)=>{

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
  // [GET] /employee/customers
  manageCustomers: async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        const customers = await User.find({role_id: 0});
        res.render("customers", { user, customers });
      } else {
        res.render("customers", { user: "" });
      }
    } catch (error) {}
  },

  manageBills: async (req, res) => {
    try {
      if (req.user) {
        const bills = await Order.find({ });
        // const bills = [];
        // const hoadons = await Order.find({ });
        // hoadons.forEach(bill=>{
        //   const user = User.findOne({_id : bill.user_id});
        //   bill.user_name = user.full_name;
        //   bill.user_address = user.address;
        //   bill.user_phone = user.phone;
        //   console.log(user);
        //   // console.log(bill.user_id);
        //   bills.push(bill);
        // });     
        // console.log(bills);   
        const user = await User.findOne({ _id: req.user });
        res.render("hoadon", { user, bills });
      } else {
        res.render("hoadon", { user: "" });
      }
    } catch (error) {}
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
  // GET :/order
  order: async (req,res)=>{
    try {
      if (req.user){
        const user= await User.findOne({_id:req.user});
        const orders=await Order.find({user_id:req.user})
                                .sort({status:1});
          
        for (let i=0;i<orders.length;i++){
          for (let j=0;j<orders[i].order.length;j++){
            product = await Product.findOne({_id : orders[i].order[j].product_id});
            orders[i].order[j].product=product;
          }
        }
        res.render('orders',{user,orders});
      }
    } catch (error) {
      return res.render("error", {
        error,
        message: "Xảy ra lỗi khi nhận dữ liệu từ server, xin thử lại",
      });
    }
    
  },
  // POST /order
  addOrder: async (req,res)=>{
    try {
      if (req.user){
        const order=req.body.order;
        await Order.create({
          user_id: req.user,
          order:order,        
        })
       const user=await User.findOne({_id:req.user});
       let cart=user.cart;
       order.map(item=>{
         cart=cart.filter(e=>e.toString()!==item.product_id);
       })
       await User.updateOne(
         { _id:req.user},
         {$set: {cart:cart}}
         );   
       res.json({mes:'success'}) ;
      } 
    } catch (error) {
      return res.render("error", {
        error,
        message: "Xảy ra lỗi khi nhận dữ liệu từ server, xin thử lại",
      });
    }

  },
  infoUser: async (req,res)=>{
    try {
      if (req.user){
        const user=await User.findOne({_id:req.user});
        res.render("info_customer",{user});
      }
      
    } catch (error) {
      return res.render("error", {
        error,
        message: "Xảy ra lỗi khi nhận dữ liệu từ server, xin thử lại",
      });
    }
   
  },
  updateInfo: async (req,res)=>{
    try {
      if (req.user){
        
        await User.updateOne({_id:req.params.customerId},req.body);
        res.redirect('/info');
      }
    } catch (error) {
      return res.render("error", {
        error,
        message: "Xảy ra lỗi khi nhận dữ liệu từ server, xin thử lại",
      });
    }
  }
};
module.exports = employeeController;
