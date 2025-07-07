import db from '../db.js';
import { promisify } from 'util';

const runAsync = promisify(db.run).bind(db);

export const createGame = async (request, reply) => {
    try {
		const all_cookies = request.cookies;
        const { players } = request.body;
    
        const meToken = all_cookies['me_token'];
        if (!meToken) return reply.status(500).send();

        const meUser = request.server.jwt.verify(meToken);
        if (!meUser) return reply.status(500).send();

        const logUser = ['AI'];
		for (const [key, value] of Object.entries(all_cookies)) {
			const user = await request.server.jwt.verify(value);
            if (user)
                logUser.push(user.username);
		}

        const allPlayersLoggedIn = players.every(player => logUser.includes(player));
        if (!allPlayersLoggedIn) {
            return reply.status(403).send({ error: 'Some players are not authenticated' });
        }
        
        const playersStr = JSON.stringify(players);
	    
        const token = reply.server.jwt.sign({ players });
        await runAsync("INSERT INTO games(game_token, users, finished) VALUES (?, ?, ?)", [token, playersStr, false]);
        return reply.send({success: true, token: token});
    
    } catch (err) {
        console.log(err);
        return reply.status(500).send();
    }
}; 