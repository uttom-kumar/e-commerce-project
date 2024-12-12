import mongoose from "mongoose"


const DataSchema = mongoose.Schema({
    title : {type : String, required : true},
    shortDes : {type : String, required : true},
    price : {type : String, required : true},
    discount : {type : Boolean, required : true},
    discountPrice : {type : String},
    image : {type : String, required : true},
    star : {type : String, required : true},
    stack : {type : Boolean, required : true},
    remark : {type : String, required : true},
    
    categoryID: {type : mongoose.Schema.Types.ObjectId,  required : true},
    brandID: {type : mongoose.Schema.Types.ObjectId,  required : true}




}, {timestamps : true, versionKey : false})

export const ProductModel = mongoose.model('products', DataSchema)