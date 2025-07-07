import db from '../db.js';
import { promisify } from 'util';
import { getWinrate } from './getStats.js';

const getAsync = promisify(db.get).bind(db);
const allAsync = promisify(db.all).bind(db);

const getAuthUsers = async (request, reply) => {
	try {
		const all_cookies = request.cookies;
		const logUser = [];
		for (const [key, value] of Object.entries(all_cookies)) {
			if (key == "2fa_token") continue ;
			const user = await request.server.jwt.verify(value);
			const row = await getAsync("SELECT username, avatar, twofa_token FROM users WHERE username = ?", [user.username]);
			row.winRate = await getWinrate(user.username)
			if (row.twofa_token) continue ;
			if (key == "me_token") row.host = true;
			if (row)
				logUser.push(row);
		}
		return reply.send(JSON.stringify(logUser));
	} catch (err) {
		console.log(err);
        reply.status(401).send();
	}
};

const getUsers = async (request, reply) => {
	try {
		const all_cookies = request.cookies;
		const rows  = await allAsync("SELECT username, avatar FROM users");
		if (!rows)
			return reply.status(400).send();
		return reply.send(JSON.stringify(rows));
	} catch (err) {
		console.log(err);
        reply.status(401).send();
	}
};

export { getAuthUsers, getUsers };