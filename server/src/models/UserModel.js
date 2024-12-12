import mongoose from "mongoose"

const DataSchema = mongoose.Schema({
    email : {type : String, unique : true, required : true, lowercase : true},
    otp: {type : String,  required : true, default:0}

}, {timestamps : true, versionKey : false})

export const UserModel = mongoose.model('users', DataSchema)