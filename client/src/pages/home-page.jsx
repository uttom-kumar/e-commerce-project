import Layout from "../component/layout/layout.jsx";
import ProductStore from "../store/ProductStore.js";
import FeatureStore from "../store/FeatureStore.js";
import {useEffect} from "react";
import Slider from "../component/product/slider.jsx";
import Features from "../component/features/features.jsx";
import Categories from "../component/product/categories.jsx";
import Products from "../component/product/products.jsx";
import Brands from "../component/product/brands.jsx";

const HomePage = () => {
    const {BrandListRequest, CategoryListRequest, ProductSliderListRequest, ProductListByRemarkRequest} = ProductStore()
    const {FeatureListRequest } = FeatureStore()

    useEffect(() => {
        (async ()=>{
            await ProductSliderListRequest();
            await FeatureListRequest();
            await CategoryListRequest();
            await ProductListByRemarkRequest("new");
            await BrandListRequest();
        })()
    }, []);

    return (
        <Layout>
            <Slider />
            <Features />
            <Categories />
            <Products />
            <Brands />
        </Layout>
    );
};

export default HomePage;