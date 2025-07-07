import db from '../db.js';
import bcrypt from 'bcrypt';
import { promisify } from 'util';

const loginUserHandler = async (request, reply) => 
{
	const {username, password} = request.body;

	if (!username || !password)
		return reply.code(400).send({ message: "All fields are mandatory" });

	const getAsync = promisify(db.get).bind(db);
	const runAsync = promisify(db.run).bind(db);
	try {
		const row = await getAsync("SELECT * FROM users WHERE username = ?", [username]);
		if (!row)
			return reply.code(401).send({ message: "Invalid credentials" });
		
		const match = await bcrypt.compare(password, row.password);
		if (!match)
			return reply.code(401).send({ message: "Invalid credentials" });

		const cookies = request.cookies;
		const sessionSet = cookies['me_token'] != null ? true : false;

		if (sessionSet) 
		{
			const userSession = await request.server.jwt.verify(cookies['me_token']);
			if (userSession.username == username)
				return ;
		}

		const token = request.server.jwt.sign({ id: row.id, username: row.username });

		
		let tokenKey;
		if (row.twofa_enable) {
			await runAsync("UPDATE users SET twofa_token = ?, connected = ? WHERE id = ? ", [token, true, row.id]);
			tokenKey = "2fa_token";
		} else {
			await runAsync("UPDATE users SET login_token = ?, connected = ? WHERE id = ? ", [token, true, row.id]);
			tokenKey = sessionSet ? username + '_token' : 'me_token';
		}
		
		reply.setCookie(tokenKey, token, {
			httpOnly: true,
			secure: false, // false not https
			sameSite: 'strict',
			path: '/', // cookie is valid across entire site
			maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
		})


		reply.send({ 
			success: true, 
			need_2fa: row.twofa_enable, 
			user: {
				username: row.username,
				avatar: row.avatar,
				twofa: row.twofa_enable,
				preferredLanguage: row.preferredLanguage
			}
		});
	}
	catch (err) {
		console.error(err);
		reply.code(500).send({ message: "Database error" });
	}
};

export {loginUserHandler};

