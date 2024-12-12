import {
    CreateInvoiceService, InvoiceListService, InvoiceProductListService,
    PaymentCancelService, PaymentFailService, PaymentIPNService, PaymentSuccessService
} from "../services/InvoiceService.js";


export const CreateInvoice = async (req, res) => {
    let result = await CreateInvoiceService(req, res)
    return res.status(200).send(result)
}

export const InvoiceList = async (req, res) => {
    let result = await InvoiceListService(req, res)
    return res.status(200).send(result)
}

export let InvoiceProductList = async (req, res) => {
    let result = await InvoiceProductListService(req, res)
    return res.status(200).send(result)
}

export const PaymentSuccess = async (req, res) => {
    let result = await PaymentSuccessService(req, res)
    return res.redirect("http://localhost:5173/orders")
}

export const PaymentCancel = async (req, res) => {
    let result = await PaymentCancelService(req, res)
    return res.redirect("http://localhost:5173/orders")
}

export const PaymentFail = async (req, res) => {
    let result = await PaymentFailService(req, res)
    return res.redirect("http://localhost:5173/orders")
}

export const PaymentIPN = async (req, res) => {
    let result = await PaymentIPNService(req, res)
    return res.redirect("http://localhost:5173/orders")
}



