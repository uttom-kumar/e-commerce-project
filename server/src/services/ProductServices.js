import mongoose from 'mongoose';
import {BrandModel} from './../models/BrandModel.js'
import {CategoryModel} from './../models/CategoryModel.js';
import {ProductSliderModel} from './../models/ProductSlidersModel.js';
import {ProductModel} from './../models/productModel.js'
import {ProductDetailsModel} from './../models/ProductDetailModel.js';
import {ReviewModel} from './../models/ReviewModel.js';
import { ProductReviewList } from '../controllers/ProductController.js';
const ObjectId = mongoose.Types.ObjectId

export const BrandListService = async () => {
    try{
        let data = await BrandModel.find()
        return {status: "success", data : data}
    }
    catch(err){
        return {status: "success", data : err.toString()}
    }
}

export const CategoryListService = async () => {
    try{
        let data = await CategoryModel.find()
        return {status: "success", data : data}
    }
    catch(err){
        return {status: "success", data : err.toString()}
    }
}

export const SliderListService = async () => {
    try{
        let data = await ProductSliderModel.find()
        return {status: "success", data : data}
    }
    catch(err){
        return {status: "success", data : err.toString()}
    }
}

export const ListByBrandService = async (req) => {

    try{
        let BrandID = new ObjectId(req.params.BrandID)
        let MatchStage = {$match: {brandID : BrandID}}
        let JoinWithBrandState = {$lookup : {
            from : 'brands',
            localField : "brandID", 
            foreignField: "_id", 
            as: "brand"
        }}
        let JoinWithCategoryStage = {$lookup : {
            from: 'categories', 
            localField : "categoryID", 
            foreignField:"_id", 
            as:"category"
        }}
        let UnwindBrandStage = {$unwind: "$brand"}
        let UnwindCategoryStage = {$unwind: "$category"}

        let ProjectionStage = {$project : {
            "brand._id":0, 
            "category._id":0, 
            "categoryID":0, 
            "brandID":0,
            "brand.createdAt" : 0, 
            "brand.updatedAt": 0,
            "createdAt" : 0, 
            "updatedAt": 0,
        }}

        let data = await ProductModel.aggregate ([
            MatchStage,
            JoinWithBrandState,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
            
        ])
        return {status: "success", data : data}
        }
        catch(err){
            return {status: "fail", data : err.toString()}
        }

}

export const ListByCategoryService = async (req) => {
    try{
        let CategoryID = new ObjectId(req.params.CategoryID)
        let MatchStage = {$match: {categoryID : CategoryID}}
        let JoinWithBrandState = {$lookup : {
            from : 'brands',
            localField : "brandID", 
            foreignField: "_id", 
            as: "brand"
        }}
        let JoinWithCategoryStage = {$lookup : {
            from: 'categories', 
            localField : "categoryID", 
            foreignField:"_id", 
            as:"category"
        }}
        let UnwindBrandStage = {$unwind: "$brand"}
        let UnwindCategoryStage = {$unwind: "$category"}

        let ProjectionStage = {$project : {
            "brand._id":0, 
            "category._id":0, 
            "categoryID":0, 
            "brandID":0,
            "brand.createdAt" : 0, 
            "brand.updatedAt": 0,
            "createdAt" : 0, 
            "updatedAt": 0,
        }}

        let data = await ProductModel.aggregate ([
            MatchStage,
            JoinWithBrandState,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
            
        ])
        return {status: "success", data : data}
    }
    catch(err){
        return {status: "fail", data : err.toString()}
    }
}

export const ListByRemarkService = async (req) => {
    try{
        let Remark = req.params.Remark
        let MatchStage = {$match: {remark : Remark}}
        let JoinWithBrandState = {$lookup : {
            from : 'brands',
            localField : "brandID", 
            foreignField: "_id", 
            as: "brand"
        }}
        let JoinWithCategoryStage = {$lookup : {
            from: 'categories', 
            localField : "categoryID", 
            foreignField:"_id", 
            as:"category"
        }}
        let UnwindBrandStage = {$unwind: "$brand"}
        let UnwindCategoryStage = {$unwind: "$category"}

        let ProjectionStage = {$project : {
            "brand._id":0, 
            "category._id":0, 
            "categoryID":0, 
            "brandID":0,
            "brand.createdAt" : 0, 
            "brand.updatedAt": 0,
            "createdAt" : 0, 
            "updatedAt": 0,
        }}

        let data = await ProductModel.aggregate ([
            MatchStage,
            JoinWithBrandState,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
            
        ])
        return {status: "success", data : data}
    }
    catch(err){
        return {status: "fail", data : err.toString()}
    }
    
}

export const ListBySmilierService = async (req) => {
    try{
        let Keyword = new ObjectId(req.params.Keyword)
        let MatchStage = {$match: {categoryID : Keyword}}

        let limitStage = {$limit:20} 

        let JoinWithBrandState = {$lookup : {
            from : 'brands',
            localField : "brandID", 
            foreignField: "_id", 
            as: "brand"
        }}
        let JoinWithCategoryStage = {$lookup : {
            from: 'categories', 
            localField : "categoryID", 
            foreignField:"_id", 
            as:"category"
        }}
        let UnwindBrandStage = {$unwind: "$brand"}
        let UnwindCategoryStage = {$unwind: "$category"}

        let ProjectionStage = {$project : {
            "brand._id":0, 
            "category._id":0, 
            "categoryID":0, 
            "brandID":0,
            "brand.createdAt" : 0, 
            "brand.updatedAt": 0,
            "createdAt" : 0, 
            "updatedAt": 0,
        }}

        let data = await ProductModel.aggregate ([
            MatchStage,
            JoinWithBrandState,
            limitStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
            
        ])
        return {status: "success", data : data}
    }
    catch(err){
        return {status: "fail", data : err.toString()}
    }
}


export const DetailService = async (req) => {
    try{
        let ProductID = new ObjectId(req.params.ProductID)
        let MatchStage = {$match : {_id : ProductID}}

        let JoinWithBrandState = {$lookup : {
            from : 'brands',
            localField : "brandID", 
            foreignField: "_id", 
            as: "brand"
        }}
        let JoinWithCategoryStage = {$lookup : {
            from: 'categories', 
            localField : "categoryID", 
            foreignField:"_id", 
            as:"category"
        }}
        let JoinWithProductDetailStage = {$lookup: {
            from : "productdetails",
            foreignField: "productID",
            localField: "_id",
            as: "productDetail"
        }}
        let UnwindBrandStage = {$unwind: "$brand"}
        let UnwindCategoryStage = {$unwind: "$category"}
        let UnwindProductDetailsStage = {$unwind: "$productDetail"}

        let ProjectionStage = {$project : {
            "brand._id":0, 
            "category._id":0, 
            "categoryID":0, 
            "brandID":0,
            "brand.createdAt" : 0, 
            "brand.updatedAt": 0,
            "createdAt" : 0, 
            "updatedAt": 0,
        }}

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandState,
            JoinWithCategoryStage,
            JoinWithProductDetailStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            // UnwindProductDetailsStage,
            ProjectionStage,
        ])
        return {status: "success", data: data}
    }
    catch(err){
        return {status: "fail", data : err.toString()}
    }
}

export const ListByKeywordService = async (req) => {
    try{ 
        let SearchRegex = {"$regex": req.params.Keyword, "$options": "i"}
        let SearchParams = [{title:SearchRegex}, {shortDes : SearchRegex}]
        let SearchQuery = {$or:SearchParams}
    
        let MatchStage = {$match:SearchQuery}
    
        let JoinWithBrandState = {$lookup : {
            from : 'brands',
            localField : "brandID", 
            foreignField: "_id", 
            as: "brand"
        }}
        let JoinWithCategoryStage = {$lookup : {
            from: 'categories', 
            localField : "categoryID", 
            foreignField:"_id", 
            as:"category"
        }}
        let JoinWithProductDetailState = {$lookup: {
            from : "productdetails",
            foreignField: "_id",
            localField: "productID",
            as: "productDetail"
        }}
        let UnwindBrandStage = {$unwind: "$brand"}
        let UnwindCategoryStage = {$unwind: "$category"}
    
        let ProjectionStage = {$project : {
            "brand._id":0, 
            "category._id":0, 
            "categoryID":0, 
            "brandID":0,
            "brand.createdAt" : 0, 
            "brand.updatedAt": 0,
            "createdAt" : 0, 
            "updatedAt": 0,
        }}
        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandState,
            JoinWithCategoryStage,
            JoinWithProductDetailState,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage,
        ])
        return {status: "success", data: data}
    }
    catch(err){
        return {status: "fail", data : err.toString()}
    }

}

export const ListByFilterService = async (req) => {
    try{
        // front-end  body theke brandID , categoryID match korteci
        let matchCondition = {}
        if(req.body['categoryID']){
            matchCondition.categoryID = new ObjectId(req.body['categoryID'])
        }
        if(req.body['brandID']){
            matchCondition.brandID = new ObjectId(req.body['brandID'])
        }
        let MatchStage = {$match:matchCondition}

        // price and filter ar upor vitti kore match korteci
        let AddFieldsStage = {
            $addFields : {
                numericPrice: {$toInt : "$price"}
            }
        }
        let priceMin = parseInt(req.body['priceMin'])
        let priceMax = parseInt(req.body['priceMax'])
        let PriceMatchConditions = {}
        if(!isNaN(priceMin)) {
            PriceMatchConditions['numericPrice'] = {$gte:priceMin}
        }
        if(!isNaN(priceMax)) {
            PriceMatchConditions['numericPrice'] = {...(PriceMatchConditions['numericPrice'] || {}), $lte:priceMax}
        }
        let PriceMatchStage = {$match: PriceMatchConditions}

        let JoinWithBrandStage = {
            $lookup : {
                from : 'brands',
                localField : "brandID",
                foreignField : "_id",
                as: "brand"
            }
        }
        let JoinWithCategoryStage = {
            $lookup : {
                from : 'categories',
                localField : "categoryID",
                foreignField : "_id",
                as: "category"
            }
        }
        let UnwindBrandStage = {$unwind: "$brand"}
        let UnwindCategoryStage = {$unwind: "$category"}
        let ProjectionStage = {
            $project : {
                'brand._id':0,
                'category._id':0,
                'categoryID' : 0,
                'brandID':0,
            }
        }

        let data = await ProductModel.aggregate([
            MatchStage,
            AddFieldsStage,
            PriceMatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])

        return {
            status: "success",
            message : "Filter successfully",
            data : data
        }

    }
    catch(err){
        return{
            status: "failed",
            message: "Some went wrong",
            data : err.toString()
        }
    }
}

export const CreateReviewService = async (req) => {
    try {
        let user_id = req.headers.user_id
        let reqBody = req.body

        let data = await ReviewModel.create(
            {
                productID: reqBody.productID,
                userID: user_id,
                des : reqBody.des,
                rating : reqBody.rating,

            }
        )

        return {
            status : "success",
            message : "Create Review Successfully!",
            data : data
        }
    }
    catch (err) {
        return{
            status : "failed",
            message : "Some went wrong",
            data : err.toString()
        }
    }
}
export const ReviewService = async (req) => {
    try {
        let ProductID = new ObjectId(req.params.ProductID)
        let MatchStage = {$match: {productID : ProductID}}

        let JoinWithProfileStage = {$lookup : {
            from : 'profiles',
            localField : 'userID',
            foreignField : 'userID',
            as : 'profile'
        }}
        let UnwindProfileStage = {$unwind : "$profile"}
        let ProjectionStage = {$project : {
            "rating" : 1,
            "des" : 1,
            "profile.cus_name" : 1,
        }}

        let data = await ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindProfileStage,
            ProjectionStage,
        ])    
        return {status: "success", data: data}
    }
    catch(err){
        return {status: "fail", data : err.toString()}
    }
}