import mongoose from "mongoose"


const DataSchema = mongoose.Schema({
    type:{type:String,unique:true,required:true},
    description:{type:String,required:true}

}, {timestamps : true, versionKey : false})

export const LegalModel = mongoose.model('legals', DataSchema)