import ReactCodeInput from 'react-code-input';
import UserSubmitBtn from "./user-submit-btn.jsx";
import UserStore from "../../store/UserStore.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const OtpForm = () => {
    let navigate = useNavigate();
    let {OtpFormData,OtpFormOnchange,UserVerifyRequest} = UserStore()
    const SubmitButton = async () =>{
        if(ValidationHelper.IsEmpty(OtpFormData.otp)){
            toast.error("valid OTP Required")
        }
        else{
            let res= await UserVerifyRequest(OtpFormData.otp)
            res?navigate("/") : toast.error("something went wrong")
        }
    }
    return (
        <div>
            <div className="container section">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <div className="card p-5">
                            <h4>Enter Verification Code</h4>
                            <p>A verification code has been sent to the email address you provide</p>
                            <div className="text-center">
                                <ReactCodeInput type='text' fields={6}  inputMode={"numeric"} name={"otp"}
                                    value={OtpFormData.otp} onChange={(value) => {OtpFormOnchange('otp', value)}}
                                />
                            </div>

                            <UserSubmitBtn onClick={SubmitButton} submit={false} className="btn mt-3 btn-success" text="Submit"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpForm;