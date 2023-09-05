import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD
	}
});
export async function sendMail(data: { to: string; subject: string; text?: string; html?: string }) {
	try {
		let info = await transporter.sendMail({
			from: '"Support 👻"<abc@gmail.com>', // sender address
			to: data.to, // list of receivers
			subject: data.subject, // Subject line
			text: data.text, // plain text body
			html: data.html // html body
		});
		console.log(info);
		return info;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
