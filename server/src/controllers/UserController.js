import {SaveProfileServices, LoginService, VerifyOTPServices, ReadProfileServices } from "../services/UserServices.js"


export const Login = async (req,res) => {
    let result = await LoginService(req)
    return res.status(200).json(result)
} 

export const VerifyLogin = async (req,res) => {
    let result = await VerifyOTPServices(req, res)
    return res.status(200).json(result)
}

export const CreateProfile = async (req,res) => {
    let result = await SaveProfileServices(req)
    return res.status(200).json(result)

}

export const UpdateProfile = async (req,res) => {
    let result = await SaveProfileServices(req)
    return res.status(200).json(result)
}

export const ReadProfile = async (req,res) => {
    let result = await ReadProfileServices(req)
    return res.status(200).json(result)
}


export const UserLogout = (req,res) => {
    let cookieOption = {
        expires:new Date(Date.now()-24*60*60*1000),
        httpOnly:false
    }
    res.cookie('token',"",cookieOption)
    return res.status(200).json({status:"success",message: 'Logged Out Successfully'})
}
