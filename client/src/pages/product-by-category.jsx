import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import Layout from "../component/layout/layout.jsx";
import ProductList from "../component/product/product-list.jsx";


const ProductByCategory = () => {
    let { ProductListByCategoryRequest} = ProductStore()
    let {id} = useParams();
    useEffect(() => {
        (async ()=>{
            await ProductListByCategoryRequest(id)
        })()
    }, [id]);


    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductByCategory;