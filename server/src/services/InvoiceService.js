import FormData from 'form-data';
import axios from "axios";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import {CartModel} from "../models/CartModel.js";
import {profileModel} from "../models/ProfileModel.js";
import {InvoiceModel} from "../models/InvoiceModel.js";
import {InvoiceProductModel} from "../models/InvoiceProductModel.js";
import {PaymentSettingModel} from "../models/paymentSettingModel.js";
import {ProductModel} from "../models/productModel.js";

// Done
export let CreateInvoiceService= async (req,res) => {
    try{
        let user_id = new ObjectId( req.headers.user_id)
        let cus_email = req.headers.email

        // ----Step 01 : calculate Total Payable & vat
        let matchStage = {
            $match : {userID : user_id}
        }
        let JoinProductStage = {
            $lookup : {
                from : 'products',
                localField : "productID",
                foreignField : "_id",
                as: "product"
            }
        }
        let winWindStage = {$unwind : "$product"}
        let CartProducts = await CartModel.aggregate([matchStage, JoinProductStage, winWindStage])

        // calculate price :---- discount: true ? then discountPrice * quantity : regular price * quantity
        let totalAmount = 0
        CartProducts.forEach((element) => {
            let price = 0;
            if(element['product']['discount']){
                price= parseFloat(element['product'].discountPrice);
            }
            else {
                price = parseFloat(element['product'].price)
            }
            // totalAmount += parseFloat(element.qty) * price
            totalAmount = totalAmount + (parseFloat(element.qty) * price)
        })
        // calculate vat
        let vat = totalAmount*0.05 // 5%
        let payable = totalAmount+vat

        // Step 02 : Customer Details & Shipping Details ______
        let profile = await profileModel.aggregate([matchStage])
        let cus_details = `Name:${profile[0]?.cus_name}, Email:${cus_email}, Address:${profile[0]?.cus_add}, Phone: ${profile[0]?.cus_phone}`
        let ship_details = `Name:${profile[0]?.ship_name}, City:${profile[0]?.ship_city}, Address:${profile[0]?.ship_add}, Phone:${profile[0]?.ship_phone}`

        // Step 03 : Transaction & Other's ID ____
        let tran_id = Math.floor(10000000+Math.random()*90000000)
        let val_id = 0
        let delivery_status = "pending"
        let payment_status = "pending"


        // Step 04 : Create Invoice ____
        let CreateInvoice = await InvoiceModel.create({
            userID: user_id,
            payable : payable,
            cus_details : cus_details,
            ship_details : ship_details,
            tran_id : tran_id,
            val_id : val_id,
            delivery_status : delivery_status,
            payment_status : payment_status,
            total : totalAmount,
            vat : vat,
        })
        // Step 05 : Create Invoice Product ____
        let invoice_id = CreateInvoice['_id']
        CartProducts.forEach(async (element)=> {
            await InvoiceProductModel.create({
                userID: user_id,
                productID: element['productID'],
                invoiceID: invoice_id,
                qty : element['qty'],
                price : element['product'].discount? element['product'].discountPrice : element['product'].price,
                color : element.color,
                size : element.size,
            })
        })

        // Step 06 : Remove Carts ____
        await CartModel.deleteMany({userID:user_id})

        // Step 07 : Prepare SSL Commerce
        let PaymentSettings = await PaymentSettingModel.find();

        const form = new FormData()
        form.append('store_id', PaymentSettings[0]?.store_id)
        form.append('store_passwd', PaymentSettings[0]?.store_passwd)
        form.append('total_amount', payable.toString())
        form.append('currency', PaymentSettings[0]?.currency)
        form.append('tran_id',tran_id)

        form.append('success_url',`${ PaymentSettings[0]?.success_url}/${tran_id}`)
        form.append('fail_url', `${PaymentSettings[0]?.fail_url}/${tran_id}`)
        form.append('cancel_url', `${PaymentSettings[0]?.cancel_url}/${tran_id}`)
        form.append('ipn_url', `${PaymentSettings[0]?.ipn_url}/${tran_id}`)
        //
        // // customer related details
        form.append('cus_name', profile[0]?.cus_name)
        form.append('cus_email', cus_email)
        form.append('cus_add1', profile[0]?.cus_add)
        form.append('cus_add2', profile[0]?.cus_add)
        form.append('cus_city', profile[0]?.cus_city)
        form.append('cus_state', profile[0]?.cus_state)
        form.append('cus_postcode', profile[0]?.cus_postcode)
        form.append('cus_country', profile[0]?.cus_country)
        form.append('cus_phone', profile[0]?.cus_phone)
        form.append('cus_fax', profile[0]?.cus_phone)

        // // customer ship related details
        form.append('shipping_method',"YES")
        form.append('ship_name', profile[0]?.ship_name)
        form.append('ship_add1', profile[0]?.ship_add)
        form.append('ship_add2', profile[0]?.ship_add)
        form.append('ship_city', profile[0]?.ship_city)
        form.append('ship_state', profile[0]?.ship_state)
        form.append('ship_country', profile[0]?.ship_country)
        form.append('ship_postcode', profile[0]?.ship_postcode)
        // product related details
        form.append('product_name', 'According Invoice')
        form.append('product_category', 'According Invoice')
        form.append('product_profile', 'According Invoice')
        form.append('product_amount', 'According Invoice')

        // last step ssl commerce a request
        let SSLRes = await axios.post(PaymentSettings[0]?.init_url, form)

        return{
            status: "success",
            message:"Successfully created",
            data : SSLRes.data
        }
    }
    catch(err){
        return {
            status: "failed",
            message:"fail created",
            data : err.toString()
        }
    }
}
// Done
export let PaymentSuccessService= async (req, res) => {
    try{
        let trxID = req.params.trxID
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"success"})
        return{
            status: "success",
            message: "payment successfully!"
        }
    }
    catch(err){
        return {
            status: "failed",
            message:"Some thing went wrong",
            data : err.toString()
        }
    }
}
export let PaymentCancelService= async (req, res) => {
    try{
        let trxID = req.params.trxID
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"cancel"})

        return{
            status: "success",
            message:"Payment Cancel",
        }
    }
    catch(err){
        return {
            status: "failed",
            message:"some thing went wrong",
            data : err.toString()
        }
    }
}
export let PaymentFailService= async (req, res) => {
    try{
        let trxID = req.params.trxID
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"fail"})

        return{
            status: "failed",
            message:"Payment failed",
        }
    }
    catch(err){
        return {
            status: "failed",
            message:"some thing went wrong",
            data : err.toString()
        }
    }
}
export let PaymentIPNService= async (req, res) => {
    try{
        let trxID = req.params.trxID
        let status = req.body['status']
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:status})

        return{status: "success",}
    }
    catch(err){
        return {
            status: "failed",
            message:"fail ",
            data : err.toString()
        }
    }
}

export let InvoiceListService= async (req, res) => {
    try{
        let user_id = req.headers.user_id
        let invoice = await InvoiceModel.find({userID : user_id})

        return{
            status: "success",
            data : invoice
        }
    }
    catch(err){
        return {
            status: "failed",
            data : err.toString()
        }
    }
}
export let InvoiceProductListService= async (req, res) => {
    try{
        let user_id = new ObjectId(req.headers.user_id)
        let invoice_id = new ObjectId(req.params.invoice_id)

        let matchStage = {
            $match: {userID: user_id, invoiceID:invoice_id}
        }
        let JoinProductStage = {
            $lookup : {
                from : "products",
                localField: "productID",
                foreignField : "_id",
                as: "product"
            }
        }
        let unwindProductStage = {$unwind: "$product"}
        let products = await InvoiceProductModel.aggregate([
            matchStage,
            JoinProductStage,
            unwindProductStage
        ])
        return{
            status: "success",
            message:"Successfully created",
            data : products
        }
    }
    catch(err){
        return {
            status: "failed",
            message:"fail created",
            data : err.toString()
        }
    }
}
