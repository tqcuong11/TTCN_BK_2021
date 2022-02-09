const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Order=new Schema({
        user_id: {
            type:ObjectId,
            ref:'users',
            required:true
        },
        user_name: {
            type: String,
            default: "",
        },
        user_address:{
            type:String,
            default: "",
          },
        user_phone:{
            type:String,
            default: "",
        },
        order: [{
            product_id:{type:ObjectId},
            count: {type:Number, default:1}
        }],
        status: {
            type:Number,
            required:true,
            default:0
        }       
    },{
        timestamps:true,
    }
)
module.exports=mongoose.model('orders',Order);