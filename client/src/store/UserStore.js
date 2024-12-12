import axios from "axios";
import {create} from "zustand";
import Cookies from 'js-cookie'
import {getEmail, setEmail, unauthorized} from "../utility/utility.js";

let baseURl = "https://e-commerce-project-six-eta.vercel.app/api/"

const UserStore = create((set) => ({

    loginFormData: {email:""},
    loginFormOnchange: (name, value) => {
        set((state) => ({
           loginFormData: {
               ...state.loginFormData,
                [name] : value,
           }
        }))
    },

    OtpFormData: {otp:""},
    OtpFormOnchange: (name, value) => {
        set((state) => ({
            OtpFormData: {
                ...state.OtpFormData,
                [name] : value,
            }
        }))
    },

    isFromSubmit: false,
    UserLoginRequest: async (email) => {
        set({isFromSubmit: true});
        let url = `${baseURl}Login/${email}`
        // set email session Storage
        setEmail(email)
        let res = await axios.post(url)
        set({isFromSubmit: false});
        return res.data['status'] === "success"
    },

    UserVerifyRequest: async (otp) => {
        set({isFromSubmit: true});
        let email = getEmail()
        let url = `${baseURl}VerifyLogin/${email}/${otp}`
        let res = await axios.post(url,{withCredentials:true})

        if(res.data['status'] === "success"){
            Cookies.set("token", res.data.token)
        }
        set({isFromSubmit: false});
        return res.data['status'] === "success"
    },
    // user login true then get token
        isLogin:()=>{
            return !!Cookies.get('token');
        },
    // UserLogOut
    UserLogoutRequest: async () => {
        set({isFormSubmit:true})
        let url = `${baseURl}UserLogout`
        let res = await axios.get(url,{
            headers: {
                token : Cookies.get('token')
            }
        })
        if(res.data['status'] === "success"){
            Cookies.remove('token')
        }
        set({isFormSubmit:false})
        return res.data['status'] === "success"
    },

    ProfileForm: {cus_add: "", cus_city:"", cus_country:"", cus_fax:"",cus_name:"",cus_phone:"", cus_postcode:"",cus_state:"",
        ship_add:"", ship_city:"",ship_country:"",ship_name:"", ship_phone:"",ship_postcode:"",ship_state:""},

    ProfileFormChange: (name, value) => {
        set((state) => ({
            ProfileForm : {
                ...state.ProfileForm,
                [name]:value
            }
        }))
    },

    ProfileDetails : null,
    ProfileDetailsRequest: async () => {
        try{
            let url = `${baseURl}ReadProfile`
            let res = await axios.get(url,{headers: {token : Cookies.get('token')}})
            if(res.data.data.length > 0){
                set({ProfileDetails:res.data.data[0]})
                set({ProfileForm: res.data.data[0]})
            }
            else{
                set({ProfileDetails:[]})
            }
        }
        catch (err){
            unauthorized(err.response.status)
        }
    },
    ProfileSaveRequest: async (PostBody) => {
        try{
            let url = `${baseURl}UpdateProfile`
            set({ProfileDetails: null})
            let res = await axios.post(url,PostBody,{headers: {token : Cookies.get('token')}})
            return res.data['status'] === "success"
        }
        catch (err){
            unauthorized(err.response.status)
        }
    }
}))

export default UserStore;