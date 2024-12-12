import ProductStore from "../store/ProductStore.js";
import {useEffect} from "react";
import ProductList from "../component/product/product-list.jsx";
import {useParams} from "react-router-dom";
import Layout from "../component/layout/layout.jsx";

const ProductByBrand = () => {
    let { ProductListByBrandRequest} = ProductStore()
    let {id} = useParams();
    useEffect(() => {
        (async ()=>{
            await ProductListByBrandRequest(id)
        })()
    }, [id]);


    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductByBrand;