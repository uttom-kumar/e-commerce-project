import {create} from "zustand";
import {unauthorized} from "../utility/utility.js";
import axios from "axios";
import Cookies from "js-cookie";


const ReviewStore = create((set)=>({
    isReviewSubmit: false,
    ReviewFormData:{des:"",rating:"5",productID:""},
    ReviewFormOnChange:(name,value)=>{
        set((state)=>({
            ReviewFormData:{
                ...state.ReviewFormData,
                [name]:value
            }
        }))
    },
    ReviewCreateRequest: async (postBody) => {
        try{
            set({isReviewSubmit:true})
            let url = `http://localhost:5050/api/CreateProductReview`
            let res = await axios.post(url,postBody,{headers: {token: Cookies.get('token')}})
            set({isReviewSubmit: false})
            return res.data['status'] === "success"
        }
        catch (err) {
            unauthorized(err.response.status);
        }
        finally {
            set({isReviewSubmit: false})
        }
    }

}))
export default ReviewStore;