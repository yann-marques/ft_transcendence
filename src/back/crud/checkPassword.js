import db from '../db.js';
import bcrypt from 'bcrypt';
import { promisify } from 'util';

const checkPassword = async (request, reply) => 
{
	const { password } = request.body;
	if (!password)
		return reply.code(400).send({ message: "All fields are mandatory" });

	const getAsync = promisify(db.get).bind(db);
	try {
        const cookies = request.cookies;
        const sessionSet = cookies['me_token'] != null ? true : false;
        if (!sessionSet) return reply.status(401).send();
        
        const userSession = await request.server.jwt.verify(cookies['me_token']);
        if (!userSession) return reply.status(401).send();

        const username = userSession.username;
        const row = await getAsync("SELECT * FROM users WHERE username = ?", [username]);
		if (!row)
			return reply.code(401).send({ message: "Invalid credentials" });

		const match = await bcrypt.compare(password, row.password);
		if (!match)
			return reply.code(401).send({ message: "Invalid credentials" });

		reply.send({ success: true });
	}
	catch (err) {
		console.error(err);
		reply.code(500).send({ message: "Database error" });
	}
};

export { checkPassword };

