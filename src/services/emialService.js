import nodemailer from "nodemailer";
import ApiError from "../utils/ApiError.js";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // true for port 465, false for other ports
	auth: {
		user: `${process.env.SMTP_USER}`,
		pass: `${process.env.SMTP_PASS}`,
	},
});

const sendEmail = async (emailInfo) => {
	try {
		const mailOption = {
			from: `${process.env.SMTP_USER}`, // sender address
			to: `${emailInfo.email}`, // list of receivers
			subject: `${emailInfo.subject}`, // Subject line
			html: `${emailInfo.html}`, // html body
		};

		const info = await transporter.sendMail(mailOption);

        return info

		// console.log("email sending info", info);
	} catch (error) {
		throw new ApiError(
			500,
			`Something went wrong while sending email, ${error}`
		);
	}
};

export default sendEmail;
