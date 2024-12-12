import ProfileSkeleton from "../../skeleton/profile-skeleton.jsx";
import {useEffect} from "react";
import UserStore from "../../store/UserStore.js";
import ProductDetailsSkeleton from "../../skeleton/product-details-skeleton.jsx";
import toast from "react-hot-toast";


const UserProfileComponent = () => {

    let {ProfileForm, ProfileFormChange, ProfileDetails, ProfileDetailsRequest, ProfileSaveRequest} = UserStore()
    useEffect(() => {
        (async () => {
           await ProfileDetailsRequest()
        })()
    }, []);

    const SaveHandler = async () => {
        let res = await ProfileSaveRequest(ProfileForm)
        if(res) {
            toast.success("Profile saved successfully")
            await ProfileDetailsRequest()
        }
    }


    return (
        <>
            {
             ProfileDetails === null? (<ProductDetailsSkeleton />): (
                 <div className="container mt-5">
                     <div className="card p-5 rounded-3">
                         <h6>Customer Details</h6>
                         <hr/>
                         <div className="row mb-4">
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Customer Name </label>
                                 <input defaultValue={ProfileForm.cus_name} onChange={(e)=>{ProfileFormChange('cus_name', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Customer Phone </label>
                                 <input defaultValue={ProfileForm.cus_phone} onChange={(e)=>{ProfileFormChange('cus_phone', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Customer Fax </label>
                                 <input defaultValue={ProfileForm.cus_fax} onChange={(e)=>{ProfileFormChange('cus_fax', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Customer Country </label>
                                 <input defaultValue={ProfileForm.cus_country} onChange={(e)=>{ProfileFormChange('cus_country', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Customer City </label>
                                 <input defaultValue={ProfileForm.cus_city} onChange={(e)=>{ProfileFormChange('cus_city', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Customer State </label>
                                 <input defaultValue={ProfileForm.cus_state} onChange={(e)=>{ProfileFormChange('cus_state', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Customer Post Code </label>
                                 <input defaultValue={ProfileForm.cus_postcode} onChange={(e)=>{ProfileFormChange('cus_postcode', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Customer Address</label>
                                 <input defaultValue={ProfileForm.cus_add} onChange={(e)=>{ProfileFormChange('cus_add', e.target.value)}} type="text" className="form-control "/>
                             </div>
                         </div>
                         <h6>Shipping Details</h6>
                         <hr/>
                         <div className="row">
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Shipping Name </label>
                                 <input defaultValue={ProfileForm.ship_name} onChange={(e)=>{ProfileFormChange('ship_name', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Shipping Phone </label>
                                 <input defaultValue={ProfileForm.ship_phone} onChange={(e)=>{ProfileFormChange('ship_phone', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Shipping Country </label>
                                 <input defaultValue={ProfileForm.ship_country} onChange={(e)=>{ProfileFormChange('ship_country', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Shipping City </label>
                                 <input defaultValue={ProfileForm.ship_city} onChange={(e)=>{ProfileFormChange('ship_city', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Shipping State </label>
                                 <input defaultValue={ProfileForm.ship_state} onChange={(e)=>{ProfileFormChange('ship_state', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Shipping Post Code </label>
                                 <input defaultValue={ProfileForm.ship_postcode} onChange={(e)=>{ProfileFormChange('ship_postcode', e.target.value)}} type="text" className="form-control "/>
                             </div>
                             <div className="col-md-3 p-2">
                                 <label className="form-label">Shipping Address</label>
                                 <input defaultValue={ProfileForm.ship_add} onChange={(e)=>{ProfileFormChange('ship_add', e.target.value)}} type="text" className="form-control "/>
                             </div>
                         </div>
                         <div className="row mt-4">
                             <div className="col-md-3 p-2">
                                 <button onClick={SaveHandler} className="btn btn-success">Save Profile</button>
                             </div>
                         </div>
                     </div>
                 </div>
             )
            }
        </>
    );
};

export default UserProfileComponent;