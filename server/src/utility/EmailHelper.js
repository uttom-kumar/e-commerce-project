import nodemailer from 'nodemailer'
import { EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_USER } from '../config/config.js'

export const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
    let transport = nodemailer.createTransport({
        host: EMAIL_HOST,
        port : EMAIL_PORT,
        secure : true,
        auth:{
            user : EMAIL_USER,
            pass : EMAIL_PASS
        },
        tls : { rejectUnauthorized : false}
    })

    let mailOption = {
        from : `MERN Ecommerce  ${EMAIL_USER}`,
        to : EmailTo,
        subject : EmailSubject,
        text : EmailText
    }
    return await transport.sendMail(mailOption)
}