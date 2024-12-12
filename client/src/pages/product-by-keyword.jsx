import {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from "../component/layout/layout.jsx";
import ProductList from "../component/product/product-list.jsx";

const ProductByKeyword = () => {
    let { ProductListByKeywordRequest} = ProductStore()
    let {keyword} = useParams();
    useEffect(() => {
        (async ()=>{
            await ProductListByKeywordRequest(keyword)
        })()
    }, [keyword]);


    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductByKeyword;