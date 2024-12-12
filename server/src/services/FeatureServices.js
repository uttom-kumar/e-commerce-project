import {FeaturesModel} from "../models/FeaturesModel.js";

export const FeatureListService = async (req) => {
    try{
        let data = await FeaturesModel.find()
        return {
            status : "success",
            message : "Features list find successfully",
            data : data
        }
    }catch(err){
        return {
            status: "failed",
            message: "Feature List not found",
            data : err.toString()
        }
    }
}