import axios from "axios";
import {create} from "zustand";

let baseURl = "https://e-commerce-project-six-eta.vercel.app/api/"

const FeatureStore = create((set) => ({
    FeatureList : null,
    FeatureListRequest : async () => {
        let url = `${baseURl}FeatureList`
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({FeatureList : res.data['data']})
        }
    },
    LegalDetails: null,
    LegalDetailsRequest : async (type) => {
        let url = `${baseURl}LegalDetails/${type}`
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({LegalDetails : res.data['data']})
        }
    }

}))

export default FeatureStore;