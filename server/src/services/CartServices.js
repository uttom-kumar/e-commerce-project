import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import {CartModel} from "../models/CartModel.js";



export const CreateCartListService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body;
        reqBody.userID = user_id;

        let data = await CartModel.create(reqBody);
        return {
            status : "success",
            message : "Cart List Update Successfully",
            data : data
        }
    }
    catch(err){
        return{
            status : "failed",
            message : "Some this wrong went",
            data : err.toString()
        }
    }
}


export  const RemoveCartListService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body;
        reqBody.userID = user_id;

        let data = await CartModel.deleteOne(reqBody);
        return {
            status : "success",
            message : "Cart List Remove Successfully",
            data : data
        }
    }
    catch(err){
        return{
            status : "failed",
            message : "Some this wrong went",
            data : err.toString()
        }
    }
}

export const ReadCartListService = async (req) => {
    try{
        let user_id = new ObjectId(req.headers.user_id);
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

        let data = await CartModel.aggregate([
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
            status : "success",
            message : "Cart List Read Successfully",
            data : data
        }
    }
    catch(err){
        return{
            status : "failed",
            message : "Some this wrong went",
            data : err.toString()
        }
    }
}

export const UpdateCartListService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let cartID = req.params.cartID
        let reqBody = req.body;

        let data = await CartModel.updateOne({_id : cartID, userID:user_id}, {$set:reqBody})

        return{
            status : "failed",
            message : "Cart list Update Successfully",
            data : data
        }
    }
    catch (err){
        return{
            status : "failed",
            message : "Some this wrong went",
            data : err.toString()
        }
    }
}