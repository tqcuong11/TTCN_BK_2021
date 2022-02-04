require('dotenv').config();
const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const auth = {
  // [POST] /Register
  register: async (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;
    try {
      // check for existing user
      const user =
        (await User.findOne({ email }));        
      if (user) {
        return res.render("register",{message:"Email đã tồn tại! Vui lòng đăng nhập hoặc dùng email khác"});
      } else {
        //   all good
        const hashedPassword = await argon2.hash(password);
        await User.create({
          full_name: req.body.full_name,
          email:req.body.email,
          password: hashedPassword,
          role_id: 0,
        });
        return res.redirect('/login');
      }
    } catch (err) {
      return res
        .status(500)
        .render('error', {
          err,
          message: 'Xảy ra lỗi trong quá trình đăng ký, xin thử lại',
        });
    }
  },
  // [POST] /Login
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user =
        (await User.findOne({ email: email })) ;
      //   check for existing email or phone
      if (!user) {
        return res.render('login',{message:"Tên đăng nhập hoặc mật khẩu không đúng!"});
      }
      //   authenticate password
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return res.render('login',{message:"Tên đăng nhập hoặc mật khẩu không đúng!"});
      }
      //   all good
      const accessToken = jwt.sign(
        { _id: user._id },
        `${process.env.signature}`,
        { expiresIn: '1d' }
      );
      const refreshToken = jwt.sign(
        { _id: user._id },
        `${process.env.signature}`,
        { expiresIn: '10d' }
      );
      await User.updateOne({ _id: user._id }, { refreshToken });
      res.cookie('access_token', accessToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true;
      });
      res.cookie('refresh_token', refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true;
      });
      switch(user.role_id){
        case 0: res.redirect("/");
          break;
        case 1: res.redirect("/employee");
          break;
        case 2: res.redirect("/admin");
          break;
      }
    } catch (err) {
      res
        .status(500)
        .render('error', {
          err,
          success: false,
          message: 'Đã xảy ra lỗi, vui lòng thử lại',
        });
    }
  },
};
module.exports = auth;
