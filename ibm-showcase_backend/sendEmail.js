const nodemailer = require("nodemailer");
const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
	process.env.OAUTH_CLIENTID, // Your client ID
	process.env.OAUTH_CLIENT_SECRET, // Your client secret
	process.env.OAUTH_REFRESH_TOKEN // Your redirect URL
  );
  
  oauth2Client.setCredentials({
	refresh_token: process.env.OAUTH_REFRESH_TOKEN, // Your refresh token
  });

async function updateAccessToken() {
try {
	const response = await oauth2Client.getAccessToken();
	const accessToken = response.token;

	return accessToken;
} catch (error) {
	console.error('Error updating access token:', error);
	throw error;
}
}

module.exports = async (email, subject, text) => {
	try {
		const accessToken = await updateAccessToken();

		const transporter = nodemailer.createTransport({
			// service: "gmail",
			// auth: {
			// 	type: "OAuth2",
			// 	user: process.env.EMAIL,
			// 	// pass: process.env.WORD,
			// 	clientId: process.env.OAUTH_CLIENTID,
			// 	clientSecret: process.env.OAUTH_CLIENT_SECRET,
			// 	refreshToken: process.env.OAUTH_REFRESH_TOKEN,
			// 	// clientId: clientId,
			// 	// clientSecret: clientSecret,
			// 	// refreshToken: refreshToken,
			// 	accessToken: accessToken,
			// },
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				type: "OAuth2",
				user: process.env.EMAIL,
				clientId: process.env.OAUTH_CLIENTID,
				clientSecret: process.env.OAUTH_CLIENT_SECRET,
				refreshToken: process.env.OAUTH_REFRESH_TOKEN,
				accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
				expires: 1484314697598,
			},
		});

		await transporter.sendMail({
			from: 'test@gmail.com',
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};