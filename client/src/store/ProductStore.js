import axios from "axios";
import {create} from "zustand";

let baseURl = "https://e-commerce-project-six-eta.vercel.app/api/"

const ProductStore = create((set) => ({
    BrandList : null,
    BrandListRequest : async () => {
        let url = `${baseURl}ProductBrandList`
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({BrandList : res.data.data})
        }
    },


    categoryList : null,
    CategoryListRequest : async () => {
        let url = `${baseURl}ProductCategoryList`
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({categoryList : res.data['data']})
        }
    },

    ProductSliderList: null,
    ProductSliderListRequest : async () => {
        let url = `${baseURl}ProductSliderList`
        let res = await axios.get(url)
        console.log(res);
        
        if(res.data['status'] === "success"){
            set({ProductSliderList : res.data['data']})
        }
    },

    ProductListByRemark:null,
    ProductListByRemarkRequest : async (remark) => {
        let url = `${baseURl}ProductListByRemark/${remark}` //remark
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({ProductListByRemark : res.data['data']})
        }
    },


    ProductList: null,
    ProductListByBrandRequest : async (BrandID) => {
        let url = `${baseURl}ProductListByBrand/${BrandID}` //BrandID
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({ProductList : res.data['data']})
        }
    },
    ProductListByCategoryRequest : async (CategoryID) => {
        let url = `${baseURl}ProductListByCategory/${CategoryID}` //CategoryID
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({ProductList : res.data['data']})
        }
    },
    ProductListByKeywordRequest : async (keyword) => {
        let url = `${baseURl}ProductListByKeyword/${keyword}` //keyword
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({ProductList : res.data['data']})
        }
    },
    ProductListByFilterRequest : async (postBody) => {
        let res = await axios.post(`${baseURl}ProductListByFilter`,postBody)
        if(res.data['status'] === "success"){
            set({ProductList : res.data['data']})
        }
    },

    SearchKeyword : "",
    SetSearchKeyword : async (keyword) => {
        set({SearchKeyword : keyword})
    },


    ProductDetails:null,
    ProductDetailsRequest : async (productID) => {
        set({ProductDetails : null})
        let url = `${baseURl}ProductDetails/${productID}` //id
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({ProductDetails : res.data['data']})
        }
    },

    ProductReviewList:null,
    ProductReviewListRequest : async (productID) => {
        let url = `${baseURl}ProductReviewList/${productID}` //id
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({ProductReviewList : res.data['data']})
        }
    },



    // ProductListBySmilier:null,
    // ProductListBySmilierRequest : async () => {
    //     let url = 'http://localhost:5050/api/ProductListBySmilier/' //id
    //     let res = await axios.get(url)
    //     if(res.data['status'] === "success"){
    //         set({ProductListBySmilier : res.data['data']})
    //     }
    // },







}))

export default ProductStore;