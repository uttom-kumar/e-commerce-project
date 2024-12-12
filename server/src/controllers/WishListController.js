import {
    ReadWishListService,
    RemoveWishListServices,
    SaveWishListServices
} from "../services/WishServices.js";



export const ReadWishList = async (req, res) => {
    let result = await ReadWishListService (req)
    return res.json(result)
}


// create & update --- both work
export const SaveWishList = async (req,res) =>{
    let result = await SaveWishListServices(req)
    return res.json(result)
}

export const RemoveWishList = async (req,res) =>{
    let result = await RemoveWishListServices(req)
    return res.json(result)
}