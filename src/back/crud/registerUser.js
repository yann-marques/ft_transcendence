import db from '../db.js'
import bcrypt from 'bcrypt';
import { promisify } from 'util';

const registerUserHandler = async (request, reply) =>
{
	const {username, email, fullname, password, confirmPassword} = request.body;
	if (!username || !email || !fullname || !password || !confirmPassword)
		return reply.status(400).send({message: "All fields are mandatory."});

	if (username == 'me' || username == 'I.A')
		return reply.status(400).send({message: "Forbidden username"});

	if (password.length < 8)
		return reply.status(400).send({message: "Password too short"});

	if ((password != '' && confirmPassword == '') || (password == '' && confirmPassword != ''))
        return reply.status(401).send();

	if (password != confirmPassword)
    	return reply.status(401).send();

	const getAsync = promisify(db.get).bind(db);
	const runAsync = promisify(db.run).bind(db);
	
	try {
		const rowEmail = await getAsync("SELECT * FROM users WHERE email = ?", [email]);
		if (rowEmail)
			return reply.status(400).send({message: "This email already exists."});
	
		const rowUsername = await getAsync("SELECT * FROM users WHERE username = ?", [username]);
		if (rowUsername)
			return reply.status(400).send({message: "This username already exists."});
		
		const hashedPassword = await bcrypt.hash(password, 10);

		const defaultAvatar = 'data:image;base64,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'
		await runAsync("INSERT INTO users(username, email, fullname, password, avatar, twofa_enable, connected) VALUES (?, ?, ?, ?, ?, ?, ?)", [username, email, fullname, hashedPassword, defaultAvatar, false, true]);
		await runAsync("INSERT INTO customizations(username, color, powerup, mapevents) VALUES (?, ?, ?, ?)", [username, '#ffffff', false, false]);
		
		const rowAdded = await getAsync("SELECT id FROM users WHERE username = ?", [username]);
		if (!rowAdded) return reply.status(500).send();

		const cookies = request.cookies;
		const sessionSet = cookies['me_token'] != null ? true : false;
		
		let tokenKey;
		tokenKey = sessionSet ? username + '_token' : 'me_token';
		const token = reply.server.jwt.sign({ id: rowAdded.id, username: username });
		reply.setCookie(tokenKey, token, {
			httpOnly: true,
			secure: false, // false not https
			sameSite: 'strict',
			path: '/', // cookie is valid across entire site
			maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
		})
		
		await runAsync("UPDATE users SET login_token = ? WHERE id = ? ", [token, rowAdded.id]);
		
		reply.send({ success: true });
	
	} catch (err) {
		console.error(err);
		reply.status(500).send({ message: "Database error" });
	}
};

export { registerUserHandler }; 