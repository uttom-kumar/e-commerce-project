import wishStore from "../../store/WishStore.js";
import ProductDetailsSkeleton from "../../skeleton/product-details-skeleton.jsx";
import NoDataFound from "../noData/noDataFound.jsx";
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import {useEffect} from "react";
import toast from "react-hot-toast";

const WishListComponent = () => {
    const {WishList,WishListRemoveRequest,WishListRequest} = wishStore();

    useEffect(() => {
        (async ()=> {
            await WishListRequest()
        })()
    }, []);

    const RemoveHandler = async (productID) => {
        await WishListRemoveRequest(productID)
        await WishListRequest()
        toast.success("Wish Item Removed")
    }


    if (WishList === null) {
        // If the WishList is loading or undefined, show a skeleton loader
        return <ProductDetailsSkeleton/>;
    } else if (WishList.length === 0) {
        // If the WishList is empty, show "No Data Found"
        return <NoDataFound/>;
    }

    // If WishList has items, display them
    else {
        return (
            <>
                <div className="container mt-3">
                    <div className="row">
                        {
                            WishList.map((item, i) => {
                                return (
                                    <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                        <div className="card shadow-sm h-100 rounded-3 bg-white">
                                            <img alt="" className="Product_img img-fluid rounded-top-2"
                                                 src={item['product']?.image}/>
                                            <div className="card-body">
                                                <p className="bodySmal text-secondary my-1">{item['product']?.title}</p>
                                                <StarRatings rating={parseFloat(item["product"]?.star)} starRatedColor="red"
                                                             starDimension="15px" starSpacing="2px"/>

                                                <p className="mt-3">
                                                    <button className="btn btn-outline-danger btn-sm"
                                                            onClick={async () =>{await RemoveHandler(item.productID)}}
                                                    >Remove
                                                    </button>
                                                    <Link className="btn mx-2 btn-outline-success btn-sm"
                                                          to={`/details/${item?.productID}`}>Details</Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        );
    }
};

export default WishListComponent;