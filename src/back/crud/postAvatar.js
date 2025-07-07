import db from '../db.js';
import { promisify } from 'util';

const runAsync = promisify(db.run).bind(db);

export const postAvatar = async (request, reply) =>
{
    try {
        const { imgBase64 } = request.body;
    
        const meToken = request.cookies['me_token'];
        if (!meToken) return reply.status(500).send();

        const meUser = request.server.jwt.verify(meToken);
        if (!meUser) return reply.status(500).send();

        const username = meUser.username;
        
        const rowAvatar = await runAsync(
            "UPDATE users SET avatar = ? WHERE username = ?",
            [imgBase64, username]
        );

    } catch (err) {
        console.log(err);
        return reply.status(500).send();
    }
}; 