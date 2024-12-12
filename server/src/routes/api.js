import express from 'express'
const router = express.Router()
import * as ProductController from '../controllers/ProductController.js'
import * as UserController from '../controllers/UserController.js'
import  {AuthMiddleware}  from '../middlewares/AuthVerification.js'
import {FeatureList, LegalDetails} from "../controllers/FeaturesController.js";
import {ReadWishList, RemoveWishList, SaveWishList} from "../controllers/WishListController.js";
import {CreateCartList, ReadCartList, RemoveCartList, UpdateCartList} from "../controllers/CartListController.js";
import {CreateProductReview, ProductListByFilter} from "../controllers/ProductController.js";
import {
    CreateInvoice,
    InvoiceList,
    InvoiceProductList, PaymentCancel,
    PaymentFail, PaymentIPN,
    PaymentSuccess
} from "../controllers/InvoiceController.js";



// **All Product controller
router.get('/ProductBrandList', ProductController.ProductBrandList)
router.get('/ProductCategoryList', ProductController.ProductCategoryList)
router.get('/ProductSliderList', ProductController.ProductSliderList)
router.get('/ProductListByBrand/:BrandID', ProductController.ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID', ProductController.ProductListByCategory)
router.get('/ProductListBySmilier/:Keyword', ProductController.ProductListBySmilier)
router.get('/ProductListByKeyword/:Keyword', ProductController.ProductListByKeyword)
router.get('/ProductListByRemark/:Remark', ProductController.ProductListByRemark)
router.post('/ProductListByFilter', ProductController.ProductListByFilter)
router.get('/ProductDetails/:ProductID', ProductController.ProductDetails)
// product review list
router.post('/CreateProductReview',AuthMiddleware, ProductController.CreateProductReview)
router.get('/ProductReviewList/:ProductID', ProductController.ProductReviewList)

// features list
router.get('/FeatureList', FeatureList)
router.get('/LegalDetails/:type', LegalDetails)


// ** User Controller
router.post('/Login/:email', UserController.Login)
router.post('/VerifyLogin/:email/:otp', UserController.VerifyLogin)
router.post('/CreateProfile',AuthMiddleware,UserController.CreateProfile)
router.post('/UpdateProfile',AuthMiddleware,UserController.UpdateProfile)
router.get('/ReadProfile',AuthMiddleware,UserController.ReadProfile)
router.get('/UserLogout',AuthMiddleware,UserController.UserLogout)

// *Wishes
// both work with create & update
router.post('/SaveWishList',AuthMiddleware, SaveWishList)
router.get('/ReadWishList',AuthMiddleware, ReadWishList)
router.post('/RemoveWishList',AuthMiddleware, RemoveWishList)


// Cart List
router.post('/CreateCartList',AuthMiddleware, CreateCartList)
router.post('/RemoveCartList',AuthMiddleware, RemoveCartList)
router.get('/ReadCartList',AuthMiddleware, ReadCartList)
router.post('/UpdateCartList/:cartID',AuthMiddleware, UpdateCartList)

// Invoice Controller
router.get("/CreateInvoice",AuthMiddleware, CreateInvoice)

router.get("/InvoiceList",AuthMiddleware, InvoiceList)
router.get("/InvoiceProductList/:invoice_id",AuthMiddleware, InvoiceProductList)

router.post("/PaymentSuccess/:trxID", PaymentSuccess)
router.post("/PaymentCancel/:trxID", PaymentCancel)
router.post("/PaymentFail/:trxID", PaymentFail)
router.post("/PaymentIPN/:trxID", PaymentIPN)









export default router;