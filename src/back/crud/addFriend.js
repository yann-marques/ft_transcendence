import db from '../db.js';
import { promisify } from 'util';

const runAsync = promisify(db.run).bind(db);
const allAsync = promisify(db.all).bind(db);

export const addFriend = async (request, reply) => {
    try {
		const all_cookies = request.cookies;
        const { target } = request.body;
    
        const meToken = all_cookies['me_token'];
        if (!meToken) return reply.status(500).send();

        const meUser = request.server.jwt.verify(meToken);
        if (!meUser) return reply.status(500).send();

        const meTargets = await allAsync(
            "SELECT * FROM friends WHERE target = ? AND accepted = ?",
            [meUser.username, false]
        );

        for (const row of meTargets) {
            await runAsync(
                "UPDATE friends SET accepted = ? WHERE id = ?",
                [true, row.id]
            )
        }
        
        const existing = await allAsync(
            `SELECT * FROM friends 
            WHERE (caller = ? AND target = ?) OR (caller = ? AND target = ?)`,
            [meUser.username, target, target, meUser.username]
        );

        if (existing.length === 0) {
            await runAsync(
                "INSERT INTO friends (caller, target, accepted) VALUES (?, ?, ?)",
                [meUser.username, target, false]
            );
        }
        
        return reply.send({success: true});
    } catch (err) {
        console.log(err);
        return reply.status(500).send();
    }
}; 