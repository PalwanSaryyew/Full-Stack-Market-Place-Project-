import nodemailer from 'nodemailer';
export const sendEmail = async mailOption =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODE_MAIL,
            pass: process.env.NODE_MAIL_PASS
        }
    })
    .sendMail(mailOption, (err, info)=>{
        if(err) {
            console.log('mail ugaramady', err);
        }
        return true
    })
 }