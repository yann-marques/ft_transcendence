import db from '../db.js';
import { promisify } from 'util';

const runAsync = promisify(db.run).bind(db);
const getAsync = promisify(db.get).bind(db);

export const addWinner = async (request, reply) => {
    try {
		const all_cookies = request.cookies;
        const { game_token, username } = request.body;
    
        const meToken = all_cookies['me_token'];
        if (!meToken) return reply.status(500).send();

        const meUser = request.server.jwt.verify(meToken);
        if (!meUser) return reply.status(500).send();

        const game = getAsync(
            "SELECT * FROM games WHERE game_token = ?",
            [game_token]
        )
        if (!game)
            return reply.status(401).send();
        
        const now = new Date();
        const pad = n => n.toString().padStart(2, '0');
        const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
                  `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

        await runAsync(
            "UPDATE games SET winner = ?, finished = ?, end_at = ? WHERE game_token = ?",
            [username, true, timestamp, game_token]
        );
        
        return reply.send({success: true});

    } catch (err) {
        console.log(err);
        return reply.status(500).send();
    }
}; 