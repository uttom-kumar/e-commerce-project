import ProductStore from "../../store/ProductStore.js";
import ProductDetailsSkeleton from "../../skeleton/product-details-skeleton.jsx";
import ProductImages from "./ProductImages.jsx";
import Reviews from "./reviews.jsx";
import parse from 'html-react-parser'
import {useState} from "react";
import CartStore from "../../store/CartStore.js";
import toast from "react-hot-toast";
import CartSubmitButton from "../carts/cart-submit-button.jsx";
import WishStore from "../../store/WishStore.js";
import WishSubmitButton from "../wish/wish-submit-button.jsx";

const ProductDetails = () => {
    const {ProductDetails} = ProductStore()
    const {CartCreateRequest,CartForm,CartListReadRequest ,CartFormChange } = CartStore()
    const {WishSaveRequest,WishListRequest} = WishStore()
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(quantity => quantity+1)
    }
    const decrementQuantity = () => {
        if(quantity > 1){
            setQuantity(quantity => quantity-1)

        }
    }

    const addCart = async (productID) => {
        let res = await CartCreateRequest(CartForm,productID, quantity)
        if(res) {
            toast.success("Cart Item Added")
            await CartListReadRequest()
        }
    }


    const addWish = async (productID) => {
        let res = await WishSaveRequest(productID)
        if(res){
            toast.success("Wish Item Added")
            await WishListRequest()
        }
    }



    return (
        <>
            {
                ProductDetails === null ? (
                    <ProductDetailsSkeleton/>
                ) : (
                    <div>
                        <div className="container mt-2">
                            <div className="row">
                                <div className="col-md-7 p-3">
                                    {/*images gallery*/}
                                    <ProductImages/>
                                </div>
                                <div className="col-md-5 p-3">
                                    <h4>{ProductDetails[0]['title']}</h4>
                                    <p className="text-muted bodySmal my-1">Category: {ProductDetails[0]['category']['categoryName']}</p>
                                    <p className="text-muted bodySmal my-1">Brand: {ProductDetails[0]['brand']['brandName']}</p>
                                    <p className="bodySmal mb-2 mt-1">{ProductDetails[0]['shortDes']}</p>
                                    {
                                        ProductDetails[0]['discount'] ? (
                                            <span className="text-secondary bodyMedium">
                                                <span>Regular price: <del>{ProductDetails[0]['price']}$ </del></span>
                                                <p className='text-dark m-0'>discountPrice: {ProductDetails[0]['discountPrice']}$</p>
                                            </span>
                                        ) : (
                                            <span className='bodyXLarge text-dark'>
                                                Regular Price: {ProductDetails[0]['price']}$
                                            </span>
                                        )
                                    }
                                    <div className="row">
                                        <div className="col-4 p-2">
                                            <label className="bodySmal">Size</label>
                                            <select defaultValue={CartForm.size} onChange={(e)=>{CartFormChange('size',e.target.value)}} className="form-control my-2 form-select">
                                                <option value="">Size</option>
                                                {
                                                    ProductDetails[0]['productDetail'][0]?.size?.split(",")?.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item}>{item}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label className="bodySmal">Color</label>
                                            <select defaultValue={CartForm.color} onChange={(e)=>{CartFormChange('color',e.target.value)}}  className="form-control my-2 form-select">
                                                <option value="">Color</option>
                                                {
                                                    ProductDetails[0]['productDetail'][0]['color']?.split(",")?.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item}>{item}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label className="bodySmal">Quantity</label>
                                            <div className="input-group my-2">
                                                <button className="btn btn-outline-secondary"
                                                        onClick={decrementQuantity}>-
                                                </button>
                                                <input value={quantity} type="text"
                                                       className="form-control bg-light text-center" readOnly/>
                                                <button className="btn btn-outline-secondary"
                                                        onClick={incrementQuantity}>+
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-4 p-2">
                                            <CartSubmitButton onClick={async ()=> {await addCart(ProductDetails[0]['_id'])}} text="Add to Cart" className="btn w-100 btn-success" />
                                        </div>
                                        <div className="col-4 p-2">
                                            <WishSubmitButton onClick={async ()=> {await addWish(ProductDetails[0]['_id'])}} text="Add to Wish" className="btn w-100 btn-success" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="Speci-tab" data-bs-toggle="tab"
                                                data-bs-target="#Speci-tab-pane" type="button" role="tab"
                                                aria-controls="Speci-tab-pane" aria-selected="true">Specifications
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="Review-tab" data-bs-toggle="tab"
                                                data-bs-target="#Review-tab-pane" type="button" role="tab"
                                                aria-controls="Review-tab-pane" aria-selected="false">Review
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="Speci-tab-pane" role="tabpanel"
                                         aria-labelledby="Speci-tab" tabIndex="0">
                                        {
                                            ProductDetails[0]?.productDetail[0]?.des &&
                                            parse(ProductDetails[0]?.productDetail[0]?.des)
                                        }
                                    </div>
                                    <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel"
                                         aria-labelledby="Review-tab" tabIndex="0">
                                        <Reviews />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )

            }
        </>
    );
};

export default ProductDetails;