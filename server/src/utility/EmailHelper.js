import nodemailer from 'nodemailer'
import {EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_SECURITY, EMAIL_USER} from '../config/config.js'

export const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
    let transport = nodemailer.createTransport({
        service: 'gmail',
        host: EMAIL_HOST,
        port : EMAIL_PORT,
        secure : EMAIL_SECURITY,
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