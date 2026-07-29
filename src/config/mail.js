import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// transporter.verify((error, success) => {

//     if (error) {
//         console.log(error);
//     } else {
        
//         console.log("SMTP Ready");
//     }

// });
export default transporter;