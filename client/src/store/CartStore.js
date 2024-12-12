import axios from "axios";
import Cookies from "js-cookie";
import {unauthorized} from "../utility/utility.js";
import {create} from 'zustand'

const CartStore = create((set)=>({
    isCartSubmit : false,
    CartForm: {productID:"", color:"",size:""},

    CartFormChange:(name,value)=>{
        set((state)=>({
            CartForm:{
                ...state.CartForm,
                [name]:value
            }
        }))
    },

    CartCreateRequest: async (PostBody, productID, quantity) => {
        try{
            set({isCartSubmit : true})
            PostBody.productID = productID;
            PostBody.qty = quantity
            let url = `http://localhost:5050/api/CreateCartList`
            let res = await axios.post(url,PostBody,{headers: {token: Cookies.get('token')}})
            if(res.data['status'] === "success"){
                set({isCartSubmit : false})

                return res.data['status'] === "success"
            }


        }
        catch (err){
            unauthorized(err.response.status)
            set({isCartSubmit : false})
        }finally {
            set({isCartSubmit : false})
        }
    },

    CartList: null,
    CartCount: 0,
    CartTotal: 0,
    CartVatTotal: 0,
    CartPayableTotal: 0,
    CartListReadRequest: async () => {
        try{
            set({isCartSubmit : true});
            let url = 'http://localhost:5050/api/ReadCartList'
            let res = await axios.get(url,{headers: {token: Cookies.get('token')}})
            set({CartList:res.data['data']})
            set({CartCount:res.data['data'].length})
            set({isCartSubmit : false})

            let total = 0
            let vat= 0
            let payable = 0

            res.data['data'].forEach((item)=>{
                if(item['product']?.discount===true){
                    total = total+parseInt(item['qty']*parseInt(item['product']['discountPrice']))
                }
                else {
                    total= total+parseInt(item['qty']*parseInt(item['product']['price']))
                }
            })

            vat=total * 0.05
            payable= vat + total
            set({CartTotal:total})
            set({CartVatTotal:vat})
            set({CartPayableTotal:payable})
        }
        catch (err){
            unauthorized(err.response.status)
            set({isCartSubmit : false})
        }
    },

    removeCartListRequest: async (cartID,productID) => {
        try{
            let url = `http://localhost:5050/api/RemoveCartList`
            set({CartList: null})
            await axios.post(url,{"_id":cartID, "productID":productID},{headers: {token: Cookies.get('token')}})
        }
        catch (err){
            unauthorized(err.response.status)
        }
    },
    // create invoice
    CreateInvoiceRequest: async () => {
        try {
            set({isCartSubmit : true})
            let url = `http://localhost:5050/api/CreateInvoice`
            let res = await axios.get(url,{headers: {token: Cookies.get('token')}})
            window.location.href=res.data['data']['GatewayPageURL']
        }
        catch (err){
            unauthorized(err.response.status)
            set({isCartSubmit: false})
        }
        finally {
            set({isCartSubmit: false})
        }
    },

    InvoiceList: null,
    InvoiceListRequest: async () => {
        try{
            let url = `http://localhost:5050/api/InvoiceList`
            let res = await axios.get(url,{headers: {token: Cookies.get('token')}})
            set({InvoiceList:res.data['data']})
        }
        catch (err){
            unauthorized(err.response.status)
        }
    },
    // invoiceProductDetails
    InvoiceProductList : null,
    InvoiceProductListRequest: async (id) => {
        try {
            let url = `http://localhost:5050/api/InvoiceProductList/${id}`
            let res = await axios.get(url,{headers: {token: Cookies.get('token')}})
            set({InvoiceProductList : res.data['data']})
        }
        catch (err){
            unauthorized(err.response.status)
        }
    }

}))

export default CartStore;