import {Link} from "react-router-dom";

const Footer = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div>
            <div className="section-bottom shadow-sm bg-white">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-4">
                            <h1 className="bodyMedium">Legals</h1>
                            <p className="my-2">
                                <Link onClick={handleScrollToTop} className="nav-link" to="/about">About</Link>
                            </p>
                            <p className="my-2">
                                <Link onClick={handleScrollToTop} className="nav-link" to="/refund">Refund Policy</Link>
                            </p>
                            <p className="my-2">
                                <Link onClick={handleScrollToTop} className="nav-link" to="/privacy">Privacy Policy</Link>
                            </p>
                            <p className="my-2">
                                <Link onClick={handleScrollToTop} className="nav-link" to="/terms">Terms</Link>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h1 className="bodyMedium">Information</h1>
                            <p className="my-2">
                                <Link onClick={handleScrollToTop} className="nav-link" to="/how-to-buy">How to buy</Link>
                            </p>
                            <p className="my-2">
                                <Link onClick={handleScrollToTop} className="nav-link" to="/contact">Contact</Link>
                            </p>
                            <p className="my-2">
                                <Link onClick={handleScrollToTop} className="nav-link" to="/complain">Complain</Link>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h1 className="bodyMedium">About</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                Ipsum </p>
                            <img className="w-75" src="https://www.uiu.ac.bd/wp-content/uploads/2021/02/Card-Logo-Pay-With-01-1.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-dark py-3 text-center">
                <p className="text-white m-0 bodySmal">All Rights Reserved </p>
            </div>
        </div>
    );
};

export default Footer;