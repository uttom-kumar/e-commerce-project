import CartStore from "../../store/CartStore.js";
import NoDataFound from "../noData/noDataFound.jsx";
import CartSkeleton from "../../skeleton/CartSkeleton.jsx";
import CartSubmitButton from "./cart-submit-button.jsx";
import toast from "react-hot-toast";

const CartComponent = () => {
    const{CartList,CartListReadRequest, removeCartListRequest,CartTotal,CartVatTotal,CartPayableTotal,CreateInvoiceRequest  } = CartStore()

    const RemoveCart = async (cartID, productID) => {
        await removeCartListRequest(cartID, productID)
        await CartListReadRequest()
        toast.success("Remove cart item")
    }

    const createInvoice = async () => {
        let res = await CreateInvoiceRequest()
        if(res) {
            toast.success("invoice Created Successfully")
        }
        else {
            toast.error("invoice failed")
        }
    }

    if(CartList===null){return <CartSkeleton />}
    else if(CartList?.length === 0){return <NoDataFound />}

    else{
        return (
            <>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card p-4">
                                <ul className="list-group list-group-flush"> {CartList?.map((item, i) => {
                                    // check discount === ture ? then discountPrice : regular Price
                                    let price = item['product']['price']
                                    if(item['product']?.discount===true){
                                        price = item['product'].discountPrice
                                    }

                                    return (
                                        <li key={i} className="mb-3 listgroup-item d-flex justify-content-between align-items-start">
                                            <img className="rounded-1" width="90" height="auto"
                                                 src={item['product']['image']} alt="image"/>
                                            <div className="ms-2 me-auto">
                                                <p className="fw-lighter m-0"></p>
                                                <p className="fw-lighter my-1">
                                                    Unit Price: {price},
                                                    Size: {item['size']},
                                                    Quantity: {item['qty']},
                                                    Color: {item['color']}</p>
                                                <p className=" h6 fw-bold m-0 text-dark">
                                                    Total <i className="bi bi-currency-dollar"></i>
                                                    {parseInt(price)*parseInt(item['qty'])}
                                                </p>
                                            </div>
                                            <button onClick={() =>RemoveCart(item['_id'],item?.productID)} className="btn btn-sm btn-outline-danger">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </li>)
                                })} </ul>
                                <div className="my-4">
                                    <ul className="list-group bg-transparent list-group-flush">
                                        <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                            <span className="float-end">
                                                Total: <i className="bi bi-currency-dollar"/>{CartTotal}
                                            </span>
                                        </li>
                                        <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                             <span className="float-end">
                                                 Vat(5%): <i className="bi bi-currency-dollar"/>{CartVatTotal}
                                            </span>
                                        </li>
                                        <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                         <span className="float-end">
                                             Payable:
                                             <i className="bi bi-currency-dollar"/>{CartPayableTotal}
                                        </span>
                                        </li>
                                        <li className="list-group-item bg-transparent ">
                                             <span className="float-end">
                                                 <CartSubmitButton text="Check Out "
                                                    className="btn px-5 mt-2 btn-success"
                                                    onClick={createInvoice}
                                                 />
                                             </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};

export default CartComponent;