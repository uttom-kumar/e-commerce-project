import mongoose from "mongoose"


const DataSchema = mongoose.Schema({
    brandName : {type : String, unique : true},
    brandImg : {type : String, required : true,},

}, {timestamps : true, versionKey : false})

export const BrandModel = mongoose.model('brands', DataSchema)