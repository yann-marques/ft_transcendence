import db from '../db.js'
import { promisify } from 'util'; 

const disable2FAHandler = async(request, reply) => {

	try {
		const runAsync = promisify(db.run).bind(db);
	
		const cookies = request.cookies;
		const meToken = cookies['me_token']
		const user = await request.server.jwt.verify(meToken)
	
		if (!user.id) return reply.status(401).send()
		const userId = user.id;
		
		// Update user for stock the secret
		await runAsync("UPDATE users SET twofa_enable = ? WHERE id = ? ", [false, userId]);
		
		return reply.send();
	} catch (err) {
		console.log("Error: ", err);
		return reply.status(500).send();
	}
} 

export { disable2FAHandler };