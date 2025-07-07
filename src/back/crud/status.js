import db from '../db.js';
import { promisify } from 'util';

const getAsync = promisify(db.get).bind(db);

const statusHandler = async (request, reply) =>
{
    try {
        const token = request.cookies.me_token;
        if (!token) {
            return reply.status(401).send({ loggedIn: false });
        }

        // Verify JWT token
        const user = await request.server.jwt.verify(token);
        const row = await getAsync("SELECT username, avatar, twofa_enable, twofa_token, login_token, preferredLanguage FROM users WHERE username = ?", [user.username]);
        if (!row)
            return reply.status(401).send({loggedIn: false});

        if (row.twofa_token || !row.login_token)
	        return reply.status(401).send({ loggedIn: false });
        
        
        return reply.send({ 
	        loggedIn: true, 
            user: { 
                username: row.username, 
                avatar: row.avatar, 
                twofa: row.twofa_enable,
                preferredLanguage: row.preferredLanguage 
            } 
        });
        
    } catch (err) {
        console.log(err);
        reply.status(401).send({ loggedIn: false });
    }
};

export { statusHandler }; 