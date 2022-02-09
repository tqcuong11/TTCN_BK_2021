const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Review =new Schema({
    user_id: {
        type:ObjectId,
        ref:'users',
        required:true
    },
    product_id:{
        type:ObjectId,
        ref:'products',
        required:true
    },
    star:{
        type:Number,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("reviews",Review)