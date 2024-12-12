import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import {WishModel} from "../models/WishModel.js";


export const ReadWishListService = async (req) => {
    try{
        let user_id = new ObjectId(req.headers.user_id)
        let matchStage =  {$match : {userID : user_id}}
        let JoinStageProduct = {
            $lookup : {
                from : 'products',
                localField : "productID",
                foreignField : "_id",
                as: "product"
            }
        }
        let JoinStageBrand = {
            $lookup : {
                from : "brands",
                localField : "product.brandID",
                foreignField : "_id",
                as: "brand"
            }
        }
        let JoinStageCategory = {
            $lookup : {
                from : 'categories',
                localField : "product.categoryID",
                foreignField : "_id",
                as: "category"
            }
        }
        let unwindProductStage = {$unwind:"$product"}
        let unwindBrandStage = {$unwind:"$brand"}
        let unwindCategoryStage = {$unwind:"$category"}

        let projectionStage = {
            $project : {
                '_id': 0,'createAt': 0,'updateAt':0, "product._id": 0, "product.categoryID": 0,
                "product.BrandID": 0, "brand._id": 0,  "category._id": 0,
            }
        }

        let data = await WishModel.aggregate([
            matchStage,
            JoinStageProduct,
            JoinStageBrand,
            JoinStageCategory,
            unwindProductStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage
        ])
        return {
            status: "success",
            message : 'Wish list save successfully',
            data : data
        }
    }
    catch(err){
        return{
            status: "failed",
            message : 'Some thing went wrong',
            data : err.toString()
        }
    }
}

// create & update --- both work
export const SaveWishListServices = async (req) =>{
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body
        reqBody.userID = user_id
        let data = await WishModel.updateOne(reqBody, {$set: reqBody}, {upsert: true})
        return{
            status: "success",
            message : 'Wish list save successfully',
            data : data
        }
    }
    catch(err){
        return{
            status: "failed",
            message : 'Some thing went wrong',
            data : err.toString()
        }
    }
}

export const RemoveWishListServices = async (req) =>{
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body
        reqBody.userID = user_id
        await WishModel.deleteOne(reqBody)

        return{
            status: "success",
            message : 'Wish list Remove successfully',
        }
    }
    catch (err){
        return{
            status: "failed",
            message : 'Some thing went wrong',
            data : err.toString()
        }
    }
}