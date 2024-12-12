import StarRatings from "react-star-ratings/build/star-ratings.js";
import ProductStore from "../../store/ProductStore.js";
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";


const ProductList = () => {
    const {ProductList,categoryList,CategoryListRequest,BrandList,BrandListRequest,ProductListByFilterRequest} = ProductStore()
    const [filter, setFilter] = useState({brandID : "", categoryID : "", priceMax : "", priceMin: ""})
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const inputOnchange =async (name, value) => {
        setFilter((data) => ({
            ...data,
            [name]: value
        }))
    }

    useEffect(() => {
        (async ()=>{
            BrandList===null? await BrandListRequest() : null;
            categoryList===null? await CategoryListRequest() : null;

            let isEveryFilterPropertyEmpty = Object.values(filter).every(value => value === "");
            !isEveryFilterPropertyEmpty? await ProductListByFilterRequest(filter) : null ;
        })()
    }, [filter]);


    return (
        <div>
            <div className='container mt-2'>
                <div className='row'>
                    <div className='col-md-3 p-2'>
                        <div className='card shadow-lg p-3'>

                            <label className='form-label mt-3 fw-bold text-warning'>Brands</label>
                            <select className='form-control form-select' value={filter.brandID}
                                    onChange={async (e) => await inputOnchange('brandID', e.target.value)}>
                                <option value=''>Choose Brand</option>
                                {
                                    BrandList !== null ? (
                                        BrandList?.map((item, i) => {
                                            return (
                                                <option key={i} value={item["_id"]}>{item["brandName"]}</option>
                                            )
                                        })
                                    ) : <option></option>
                                }
                            </select>

                            <label className='form-label mt-3 fw-bold text-warning '>Categories</label>
                            <select className='form-control form-select' value={filter.categoryID}
                                    onChange={async (e) => await inputOnchange('categoryID', e.target.value)}>
                                <option value=''>Choose Categories</option>
                                {
                                    categoryList !== null ? (
                                        categoryList?.map((item, i) => {
                                            return (
                                                <option key={i} value={item["_id"]}>{item["categoryName"]}</option>
                                            )
                                        })
                                    ) : <option></option>
                                }
                            </select>

                            <label className='form-label mt-3 fw-bold text-warning '>Maximum Prices
                                ${filter.priceMax}</label>
                            <input
                                value={filter.priceMax}
                                onChange={async (e) => await inputOnchange('priceMax', e.target.value)}
                                min={0} max={1000000} step={1000} type="range" className="form-range"
                            />

                            <label className='form-label mt-3 fw-bold text-warning '>Minimum Prices
                                ${filter.priceMin}</label>
                            <input min={0}
                                   value={filter.priceMin}
                                   onChange={async (e) => await inputOnchange('priceMin', e.target.value)}
                                   max={1000000} step={1000} type="range" className="form-range"
                            />
                        </div>
                    </div>
                    <div className='col-md-9'>
                        <div className='container'>
                            <div className='row'>
                                {
                                    ProductList === null ? <ProductsSkeleton/> :
                                        ProductList?.map((item, index) => {

                                            let price = <p className="bodyMedium text-dark my-1">Price :
                                                ${item['price']}</p>
                                            if (item['discount'] === true) {
                                                price = <p className="bodyMedium text-dark my-1">Price
                                                    : <strike> ${item['price']} </strike> ${item['discountPrice']}
                                                </p>
                                            }

                                        return (
                                            <div key={index}
                                                 className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                <Link onClick={handleScrollToTop} to={`/details/${item['_id']}`}
                                                      className="card shadow-sm h-100 rounded-3 bg-white">
                                                    <img className="ProductList_img w-100 rounded-top-2" src={item['image']} alt={'image'}/>
                                                    <div className="card-body">
                                                        <p className="bodySmal text-secondary my-1">{item['title']}</p>
                                                        {price}
                                                        <StarRatings rating={parseFloat(item['star'])}
                                                                     starRatedColor="red" starDimension="15px"
                                                                     starSpacing="2px"/>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;