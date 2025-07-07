import db from '../db.js'
import { promisify } from 'util'; 

const enable2FAHandler = async(request, reply) => {

	try {
		const runAsync = promisify(db.run).bind(db);
	
		const cookies = request.cookies;
		const meToken = cookies['me_token']
		const user = await request.server.jwt.verify(meToken)
	
		if (!user.id) return reply.status(401).send()
		const userId = user.id;
		
		// Generates a TOTP secret 
		const secret = request.server.totp.generateSecret();
		
		await runAsync("UPDATE users SET twofa_secret = ? WHERE id = ? ", [secret, userId]);

		// Generates the qrcode to be displayed 
		const qrcode = await request.server.totp.generateQRCode({ secret });

	 	const twofaToken = reply.server.jwt.sign({ id: user.id, username: user.username });

		reply.setCookie('2fa_token', twofaToken, {
			httpOnly: true,
			secure: false, // false not https
			sameSite: 'strict',
			path: '/', // cookie is valid across entire site
			maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
		})
		
		// return qrcode
		return reply.send({qrcode});
	} catch (err) {
		console.log("Error: ", err);
		return reply.status(500).send();
	}
} 

export { enable2FAHandler };