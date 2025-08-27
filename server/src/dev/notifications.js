import nodemailer from "nodemailer";

export async function sendMail(to, subject, text) {
  // Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,  
      pass: process.env.EMAIL_PASS, 
    },
  });

  // Mail:
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };
  
  await transporter.sendMail(mailOptions);
}
