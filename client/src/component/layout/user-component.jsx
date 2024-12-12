import {Link} from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import UserStore from "../../store/UserStore.js";
import toast from "react-hot-toast";
import UserSubmitBtn from "../user/user-submit-btn.jsx";


const UserComponent = () => {
    let {isLogin,UserLogoutRequest} = UserStore()

    const LogoutHandler = async () => {
        try {
            await UserLogoutRequest()
            toast.success("Logged out successfully");
            sessionStorage.clear();
            localStorage.clear();
            // Redirect to the home page
            window.location.href = "/";
        } catch (err) {
            toast.error("Logout failed. Please try again.");
        }
    };


    return (
        <>
            <ul className="nav-item dropdown m-0 p-0 d-lg-block d-md-none">
                <button className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false" >
                    {/*user image*/}
                    <CgProfile className="fs-4"/>
                </button>
                    {
                        isLogin()?(
                            <>
                                <ul className="dropdown-menu dropdown_menu text-center" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to='/profile'>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <UserSubmitBtn className="btn" text="Logout" onClick={LogoutHandler}/>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <></>
                        )
                    }
            </ul>
        </>
    );
};

export default UserComponent;