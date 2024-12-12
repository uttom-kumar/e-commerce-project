import { EmailSend } from "../utility/EmailHelper.js"
import { UserModel } from './../models/UserModel.js';
import { EncodeToken } from './../utility/TokenHelper.js';
import { profileModel } from './../models/ProfileModel.js';




export const LoginService = async (req,res) => {
    
    try{
        let email = req.params['email']
        let code = Math.floor(100000+Math.random()*900000)
        let EmailText = `Your Verification Code is = ${code}`
        let EmailSubject = "Email Verification"
        await EmailSend (email, EmailText, EmailSubject)

        await UserModel.updateOne({email:email}, {$set: {otp : code}}, {upsert : true})
        return {status : "success", message : "6 digits OTP has been send"}
    }
    catch(err){
        return {status : "fail", message : "Something Went Wrong", error : err.toString()}
    }

}

export const VerifyOTPServices = async (req,res) => {
    try{
        let email = req.params['email']
        let otp = req.params['otp']
        let userCount = await UserModel.aggregate([
            {$match: {email:email}},
            {$count: 'total'}
        ])

        if(userCount[0].total === 1){
            let user = await UserModel.find({email:email, otp:otp})
            // User token Create
            let token = EncodeToken(user[0]["email"],user[0]['_id'].toString())
            // OTP code update 0
            await UserModel.updateOne({email:email},{$set: {otp:"0"}})
            // Cookies Option
            let cookieOption={
                httpOnly: true,
                secure: true,
                maxAge: 7*24 * 60 * 60 * 1000,
                sameSite: 'none',
            }
            // Set Cookies With Response
            res.cookie('token',token,cookieOption)
            return {status : "success", message:"Valid OTP", token: token}
        }
        else{
            return {status : "fail", message : "Invalid OTP"}
        }
    }
    catch(err){
        return {
            status : "fail",
            message : "Something Went Wrong",
            error : err.toString()
        }
    }


}

// both word with create and update function
export const SaveProfileServices = async (req,res) => {
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body
        reqBody.userID = user_id
        
        let data = await profileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})

        return {status : "success",message : "Profile Update Successfully", data : data}
    }
    catch(err){
        return {status : "Profile Update failed",message : err.toString()}
    }
}


export const ReadProfileServices = async (req,res) => {
    try{
        let user_id = req.headers.user_id
        let data = await profileModel.find({userID:user_id})
        return {status : "success", message : "Profile Read Successfully", data : data}
    }
    catch(err){
        return {status : "fail", message : "Something Went Wrong", error : err.toString()}
    }

}