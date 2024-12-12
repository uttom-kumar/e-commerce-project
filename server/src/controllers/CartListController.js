import {
    CreateCartListService,
    ReadCartListService,
    RemoveCartListService,
    UpdateCartListService,
} from "../services/CartServices.js";


export const CreateCartList = async (req, res) => {
    let result = await CreateCartListService(req)
    return res.json(result)
}

export const RemoveCartList = async (req, res) => {
    let result = await RemoveCartListService(req)
    return res.json(result)
}
export const ReadCartList = async (req, res) => {
    let result = await ReadCartListService(req)
    return res.json(result)
}

export const UpdateCartList = async (req, res) => {
    let result = await UpdateCartListService(req)
    return res.json(result)
}