import db from '../db.js';
import { promisify } from 'util';

const getAsync = promisify(db.get).bind(db);
const getAuthUsersCustom = async (request, reply) => {
	try {
		const all_cookies = request.cookies;
		const logUser = [];
		for (const [key, value] of Object.entries(all_cookies)) {
			const user = await request.server.jwt.verify(value);
			const row = await getAsync("SELECT username, color, powerup, mapevents FROM customizations WHERE username = ?", [user.username]);
			if (row)
				logUser.push(row);
		}
		reply.send(JSON.stringify(logUser));
	} catch (err) {
		console.log(err);
        reply.status(401).send();
	}
};


export { getAuthUsersCustom };