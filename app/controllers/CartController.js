const User=require("../models/User");
const Product=require('../models/Product');

const CartController={
    index : async (req,res)=>{
        try {
            console.log(req.session.userId);
            if (req.session.userId){
                const user= await User.find({_id:req.session.userId});
                console.log(user);
                res.render("home");

            }
        } catch (error) {
            
        }
    },
    add:,
    delete:
}

module.exports=CartController;