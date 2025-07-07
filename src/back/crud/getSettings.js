import db from '../db.js';
import { promisify } from 'util';

const getAsync = promisify(db.get).bind(db);

export const getSettings = async (request, reply) => {
    try {
		const all_cookies = request.cookies;
    
        const meToken = all_cookies['me_token'];
        if (!meToken) return reply.status(500).send();

        const meUser = request.server.jwt.verify(meToken);
        if (!meUser) return reply.status(500).send();

        const me = await getAsync(
            "SELECT username, email, fullname FROM users WHERE id = ?",
            [meUser.id]
        );

        return reply.send(me);
        
    } catch (err) {
        console.log(err);
        return reply.status(500).send();
    }
}; 