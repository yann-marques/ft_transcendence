import db from '../db.js'
import {promisify} from 'util'

const verify2FAHandler = async (request, reply) => {

	try {
		const runAsync = promisify(db.run).bind(db);
		const { totpCode } = request.body;
		
		const cookies = request.cookies;
		const twofaToken = cookies['2fa_token'];
		if (!twofaToken)
			return reply.status(401).send({ message: "Missing authentication token" });
		
		const user = await request.server.jwt.verify(twofaToken)
		if (!user.id) return reply.status(400).send()
		const userId = user.id;
		
		const getAsync = promisify(db.get).bind(db);
		const row = await getAsync("SELECT twofa_secret FROM users WHERE id = ?", [userId]);
		
		if (!row || !row.twofa_secret)
			return reply.status(400).send({ message: "2FA not set up for this user" });
		
		const secret = row.twofa_secret;
		const isValid = request.server.totp.verify({ secret: secret, token: totpCode, encoding: "base32", window: 5 });
		if (!isValid)
			return reply.status(401).send({ message: "Invalid 2FA code" });


		await runAsync("UPDATE users SET twofa_token = ?, login_token = ? WHERE id = ? ", [null, twofaToken, userId]);

		let meUser;
		const sessionSet = cookies['me_token'] != null ? true : false;
		if (sessionSet)
			meUser = await request.server.jwt.verify(cookies.me_token);
		const tokenKey = sessionSet ? user.username + '_token' : 'me_token';

		if (sessionSet) {
			if (user.username != meUser.username) {
				reply.setCookie(tokenKey, twofaToken, {
					httpOnly: true,
					secure: false, // false not https
					sameSite: 'strict',
					path: '/', // cookie is valid across entire site
					maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
				})
			}
		} else {
			reply.setCookie(tokenKey, twofaToken, {
				httpOnly: true,
				secure: false, // false not https
				sameSite: 'strict',
				path: '/', // cookie is valid across entire site
				maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
			})
		}

		reply.clearCookie('2fa_token', {
			httpOnly: true,
			secure: false,
			sameSite: 'Strict',
			path: '/',
		});
		
		await runAsync("UPDATE users SET twofa_enable = ? WHERE id = ? ", [true, userId]);

		return reply.status(200).send({ message: "2FA verified" });
	
	} catch (err) {
		console.log("Error: ", err);
		return reply.status(500).send();
	}
}

export { verify2FAHandler };