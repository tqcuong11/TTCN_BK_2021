const Product= require('../models/Product');
const User = require('../models/User');

const SiteController = {
  // [GET] / home
  home: async (req, res) => {
    try {
      const products = await Product.find({});
      if (req.user) {
        const user = await User.findOne({ _id: req.user });
        res.render('home', { products, user });
      } else {
        res.render('home', { products, user: '' });
      }
    } catch (err) {
      return res.render('error', {
        err,
        message: 'Xảy ra lỗi khi nhận dữ liệu từ server, xin thử lại',
      });
    }
  },
  // [GET] / login
  login: (req, res) => {
    res.render('login');
  },
  // [GET] / register
  register: (req, res) => {
    res.render('register');
  },
  
  // [POST] / info/logout
  logout: async (req, res) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    const refreshToken = req.cookies.refresh_token;
    await User.updateOne({ refreshToken }, { refreshToken: '' });
    try {
      const products = await Product.find({});
      res.cookie('isLoggedIn', 'false');
      res.render('home', {
        products: products,
        user: '',
      });
    } catch (err) {
      res.render('error', {
        err,
        message: 'Có lỗi khi nhận dữ liệu từ server, xin thử lại',
      });
    }
  }
 
};
module.exports = SiteController;
