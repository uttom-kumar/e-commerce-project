import mongoose from "mongoose"

const DataSchema = mongoose.Schema({
    productID: {type : mongoose.Schema.Types.ObjectId,  required : true},
    userID: {type : mongoose.Schema.Types.ObjectId,  required : true},
    des : {type : String, required : true},
    rating : {type : String, required : true}

}, {timestamps : true, versionKey : false})

export const ReviewModel = mongoose.model('reviews', DataSchema)