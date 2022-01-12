const User=require("../models/User");
const Product=require('../models/Product');

const CartController={
    index : async (req,res)=>{
        try {
            console.log(req.session.userId);
            if (req.session.userId){
                const user= await User.findOne({_id:req.session.userId});
                let products=[];
                if (user.cart.length!==0){
                    for (let index=0;index<user.cart.length;index++)
                        products.push(await Product.findOne({_id : user.cart[index]}));
                }
                user.cart=products;
                res.render("cart",{user});
            }
            else {
                const user={};               
                let cart=req.cookies.cart;
                let products=[];
                if (cart){
                    cart=JSON.parse(cart);
                    for (let index=0;index<cart.length;index++)
                        products.push(await Product.findOne({_id : cart[index]}));
                }
                user.cart=products;
                console.log(user)
                res.render('cart',{user}); 

            }
        } catch (error) {
            
        }
    },

}

module.exports=CartController;