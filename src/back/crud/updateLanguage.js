import db from '../db.js';
import { promisify } from 'util';

export async function updateLanguageHandler(request, reply) 
{
	const { lang } = request.body;

	if (!['en', 'fr', 'sp'].includes(lang))
		return reply.code(400).send({ error: "Invalid language code" });

	const token = request.cookies.me_token;
	if (!token)
		return reply.status(401).send({ error: "Unauthorized" });

	let user;
	try {
		user = await request.server.jwt.verify(token);

		const runAsync = promisify(db.run).bind(db);
		await runAsync("UPDATE users SET preferredLanguage = ? WHERE username = ?", [lang, user.username]);

		reply.send();
	} 
	catch (err) {
		console.error("❌ Erreur dans updateLanguageHandler:", err);
		return reply.status(401).send({ error: "Invalid token or database error" });
	}
}