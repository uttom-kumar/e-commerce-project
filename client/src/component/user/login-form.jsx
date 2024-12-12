import UserStore from "../../store/UserStore.js";
import UserSubmitBtn from "./user-submit-btn.jsx";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    let navigate = useNavigate();

    let {loginFormData,loginFormOnchange,UserLoginRequest} = UserStore()
    const SubmitButton = async () => {
        try {
            // Validate email format
            if (!ValidationHelper.IsEmail(loginFormData.email)) {
                toast.error("Please enter a valid email address.");
                return; // Stop execution if validation fails
            }
            // Send login request
            const res = await UserLoginRequest(loginFormData.email);
            // Navigate to OTP verification page or show error
            if (res) {
                navigate("/otpVerify");
                toast.success("Check your email and send 6 digits otp");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            // Handle unexpected errors
            toast.error("An unexpected error occurred. Please try again later.");
            console.error("SubmitButton Error:", error);
        }
    };


    return (
        <div>
            <div className="container section">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <div className="card p-5">
                            <h4>Enter Your Email</h4>
                            <p>A verification code will be sent to the email address you provide</p>
                            <input placeholder="Email Address" value={loginFormData.email} type="email"
                                   className="form-control"
                                onChange={(e) => {
                                    loginFormOnchange('email', e.target.value)
                                }}
                            />
                            <UserSubmitBtn onClick={SubmitButton} submit={false} className="btn mt-3 btn-success" text="Next"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;