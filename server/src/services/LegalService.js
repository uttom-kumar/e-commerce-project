import {LegalModel} from "../models/LegalModel.js";

export const LegalDetailsService = async (req) => {
    try{
        let type = req.params.type
        let data = await LegalModel.find({type:type})
        return {
            status: "success",
            data: data
        }
    }
    catch (err) {
        return{
            status : "failed",
            data : err.toString()
        }
    }
}