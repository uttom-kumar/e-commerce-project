import {FeatureListService} from "../services/FeatureServices.js";
import {LegalDetailsService} from "../services/LegalService.js";

export const FeatureList = async (req, res) => {
    let result = await FeatureListService (req)
    return res.json(result)
}

export const LegalDetails = async (req, res) => {
    let result = await LegalDetailsService (req)
    return res.json(result)
}