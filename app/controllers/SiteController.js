const Product = require("../models/Product");
const User = require("../models/User");
const Order=require("../models/Order");

const SiteController = {
  // [GET] / home
  home: async (req, res) => {
    try {
      let products = await Product.find({});
      let brands=[];
      let storages=[];
      products.map(product=>{
        if (!brands.includes(product.brand))
          brands.push(product.brand);
        if (!storages.includes(product.storage))
          storages.push(product.storage);
      })    
        storages=storages.sort(function(a, b) {
          return b-a;
        });
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        res.render("home", { products, user ,brands,storages});
      } else {
        res.render("home", { products, user: "" ,brands,storages});
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
    try {
      const startFrom=req.body.startFrom;
      const limit=6;
      let products=await Product.find();
      if (req.query.c&&req.query.c.length){
        products=products.filter(product=>product.brand===req.query.c);
      }
      if (req.query.s&&req.query.s.length){
        products=products.filter(product=>product.storage.toString()===req.query.s);
      }
      if (req.query.search&&req.query.search.length){
        products=products.filter(product=>product.name.includes(req.query.search));
      }
      const length=products.length;      
      const result=products.slice(startFrom,startFrom+limit);
      if (startFrom+limit>=length){        
        res.json({products:result,end:true})
      } else res.json({products:result});
      } catch (err) {
        res.render("error", {
          err,
          message: "Có lỗi khi nhận dữ liệu từ server, xin thử lại",
        });
      }
    
  },

  // [GET] / detail
  detail: async (req, res, next) => {
    try {
      const product_slug = req.params.slug;
    const product = await Product.findOne({ slug: product_slug }).exec();
   
    const sameProducts=await Product.find({brand:product.brand});
    if (req.user) {
      const user = await User.findOne({ _id: req.user });
      if (product) res.render("product-detail", { product, user,sameProducts });
      else next();
    } else {
      if (product) res.render("product-detail", { product, user: "",sameProducts });
      else next();
    }
    } catch (err) {
      res.render("error", {
        err,
        message: "Có lỗi khi nhận dữ liệu từ server, xin thử lại",
      });
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
    } catch (err) {
      return res.render("error", {
        err,
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
          user_name: req.user.name,
          user_address: req.user.address,
          user_phone: req.user.phone,         
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
    } catch (err) {
      return res.render("error", {
        err,
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
      
    } catch (err) {
      return res.render("error", {
        err,
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
    } catch (err) {
      return res.render("error", {
        err,
        message: "Xảy ra lỗi khi nhận dữ liệu từ server, xin thử lại",
      });
    }
  }
};
module.exports = SiteController;
