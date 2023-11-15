import nodemailer from 'nodemailer';

const emailConfirmation = async (data) => {
    var transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
    });
    const {email, username, token} = data;

    await transport.sendMail({
        from: "Welcome to Online Shop El Salvador",
        to: email,
        subject: "Confirm Your Account",
        text: "Enter the link to confirm your account",
        html: `<h1>Hi, ${username}, Welcome to Online Shop El Salvador</h1>
            <p>To start shopping please confirm your account here:
                <a href="http://localhost:5173/confirm-account/${token}">Confirm Your Account Here</a>
            </p>

            <p>If you did not request this link, please ignore this message</p>
        
        `
    })
}

export default emailConfirmation;