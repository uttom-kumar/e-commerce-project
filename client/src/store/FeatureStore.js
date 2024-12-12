import axios from "axios";
import {create} from "zustand";

const FeatureStore = create((set) => ({
    FeatureList : null,
    FeatureListRequest : async () => {
        let url = 'http://localhost:5050/api/FeatureList'
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({FeatureList : res.data['data']})
        }
    },
    LegalDetails: null,
    LegalDetailsRequest : async (type) => {
        let url = `http://localhost:5050/api/LegalDetails/${type}`
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({LegalDetails : res.data['data']})
        }
    }

}))

export default FeatureStore;