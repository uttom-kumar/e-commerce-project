import ProductStore from "../store/ProductStore.js";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import Brands from "../component/product/brands.jsx";
import ProductDetails from "../component/product/product-Details.jsx";
import Layout from "../component/layout/layout.jsx";


const ProductPage = () => {
    const {BrandList,ProductDetailsRequest, ProductReviewListRequest,BrandListRequest } = ProductStore()
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            await ProductDetailsRequest(id)
            await ProductReviewListRequest(id)
            BrandList === null? await BrandListRequest() : null
        })()
    }, []);


    return (
        <Layout>
            <ProductDetails />
            <Brands />
        </Layout>
    );
};

export default ProductPage;