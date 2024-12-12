import {create} from "zustand";
import axios from "axios";
import {unauthorized} from "../utility/utility.js";
import Cookies from "js-cookie";

let baseURl = "https://e-commerce-project-six-eta.vercel.app/api/"

const WishStore = create((set)=>({
    isWishSubmit:false,

    WishSaveRequest: async (productID) => {
        try {
            set({isWishSubmit:true})
            let url = `${baseURl}SaveWishList`
            let res = await axios.post(url, {productID:productID},{headers: {token: Cookies.get('token')}})
            return res.data['status'] === "success"
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({isWishSubmit:false})
        }
    },

    WishList: null,
    WishCount: 0,
    WishListRequest: async () => {
        try {
            set({isWishSubmit:true})
            let url = `${baseURl}ReadWishList`
            let res = await axios.get(url,{headers: {token: Cookies.get('token')}})
            set({WishList: res.data['data']})
            set({WishCount: (res.data['data']).length})
            set({isWishSubmit:false})
        }catch (e) {
            unauthorized(e.response.status)
        }
    },
    WishListRemoveRequest : async (productID) => {
        try {
            let url = `${baseURl}RemoveWishList`
            await axios.post(url, {productID:productID},{headers: {token: Cookies.get('token')}})
        }
        catch (err){
            unauthorized(err.response.status)
        }
    }

}))
export default WishStore;