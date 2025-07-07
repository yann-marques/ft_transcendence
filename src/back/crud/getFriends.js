import db from '../db.js';
import { promisify } from 'util';

const runAsync = promisify(db.run).bind(db);
const getAsync = promisify(db.get).bind(db);
const allAsync = promisify(db.all).bind(db);

export const getFriends = async (request, reply) => {
    try {
		const all_cookies = request.cookies;
    
        const meToken = all_cookies['me_token'];
        if (!meToken) return reply.status(401).send();

        const meUser = request.server.jwt.verify(meToken);
        if (!meUser) return reply.status(401).send();

        const myFriends = await allAsync(
            "SELECT * FROM friends WHERE (caller = ? OR target = ?) AND accepted = ?",
            [meUser.username, meUser.username, true]
        );

        let friendsList = [];

        for (const row of myFriends) {
            let friendUsername;
            if (row.caller != meUser.username)
                friendUsername = row.caller;
            else
                friendUsername = row.target;

            const friend = await getAsync(
                "SELECT username, avatar, connected FROM users WHERE username = ?",
                [friendUsername]
            );
            if (friend)
                friendsList.push(friend)
        } 
        return reply.send(JSON.stringify(friendsList));
        
    } catch (err) {
        console.log(err);
        return reply.status(500).send();
    }
}; 