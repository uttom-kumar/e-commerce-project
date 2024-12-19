import {Link} from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import ProductStore from "../../store/ProductStore.js";
import UserComponent from "./user-component.jsx";
import UserStore from "../../store/UserStore.js";
import CartStore from "../../store/CartStore.js";
import WishStore from "../../store/WishStore.js";
import {useEffect} from "react";


const AppNavbar = () => {
    let {isLogin} = UserStore()
    let {CartCount,CartListReadRequest} = CartStore()
    let {WishListRequest,WishCount} = WishStore()


    useEffect(() => {
        (async () => {
            if(isLogin()){
                await CartListReadRequest()
                await WishListRequest()
            }
        })()
    }, []);

    const {SetSearchKeyword, SearchKeyword} = ProductStore()
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <>
            <div className="container-fluid text-white p-2 bg-info">
                <div className="container">
                    <div className="row justify-content-around">
                        <div className="col-md-6">
                            <span>
                                <span className="f-12">
                                    <i className="bi bi-envelope"></i> Support@PlanB.com
                                </span>
                                <span className="f-12 mx-2">
                                    <i className="bi bi-envelope"></i> 01774688159
                                </span>
                            </span>
                        </div>
                        <div className="col-md-6">
                            <span className="float-end">
                                <span className="bodySmal mx-2">
                                    <i className="bi bi-whatsapp"></i>
                                </span>
                                <span className="bodySmal mx-2">
                                    <i className="bi bi-youtube"></i>
                                </span>
                                <span className="bodySmal">
                                    <i className="bi bi-facebook"></i>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="navbar sticky-top shadow-sm bg-white navbar-expand-lg navbar-light m-0 py-2 align-items-center">
                <div className="container ">
                    <Link className="navbar-brand" to="/">
                        <span className="d-flex align-items-center"><FaShopify className="fs-1 text-info" />HappyShop</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav06"
                            aria-controls="nav06" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav06">
                        <div className="ms-auto">
                        <form className="d-flex ">
                                <input className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search" onChange={(e) => SetSearchKeyword(e.target.value)}/>
                                <Link onClick={handleScrollToTop}
                                      to={SearchKeyword.length > 0 ? `/by-keyword/${SearchKeyword}` : `/`}
                                      className="btn btn-outline-info" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" style={{width: 24, height: 24}}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </Link>
                            </form>
                        </div>
                        <ul className="navbar-nav ms-auto">
                            <li>
                                <Link onClick={handleScrollToTop} className="btn ms-2 border-0  position-relative d-flex gap-2"
                                      to="/"><i className="bi bi-house"></i><span className="d-lg-none">Home</span>
                                </Link>
                            </li>
                            {
                                isLogin()?(
                                    <>
                                        <li>
                                            <Link onClick={handleScrollToTop} to="/cart" type="button"
                                                  className="btn ms-2 me-3 btn-outline-info border-0 position-relative d-flex gap-2">
                                                <i className="bi text-dark bi-bag"></i><span
                                                className="d-lg-none">Cart</span>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">{CartCount}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={handleScrollToTop} to="/wish" type="button"
                                                  className="btn ms-2 me-3 btn-outline-info border-0 position-relative d-flex gap-2">
                                                <i className="bi text-dark bi-heart"></i><span
                                                className="d-lg-none">Wish</span>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">{WishCount}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={handleScrollToTop} to="/orders" type="button"
                                                  className="btn ms-2 me-2 btn-outline-info border-0 position-relative d-flex gap-2">
                                                <i className="bi text-dark  bi-truck"></i><span
                                                className="d-lg-none">Orders</span>
                                            </Link>
                                        </li>
                                    </>
                                ) : (<></>)
                            }
                            <div className="d-flex align-items-center gap-2">
                                <div className="">
                                    <UserComponent/>
                                </div>
                                {
                                    isLogin() ? (<></>) : (
                                        <>
                                            <Link to='/login' className="btn btn-success">Login </Link>
                                        </>
                                    )
                                }
                            </div>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
export default AppNavbar;