import { promisify } from 'util';
import db from '../db.js'

const logoutAll = async (request, reply) => {

	const runAsync = promisify(db.run).bind(db);

    const all_cookies = request.cookies;
    reply.clearCookie('me_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        path: '/',
    });

    for (const [key, value] of Object.entries(all_cookies)) {
        try {
            const user = await request.server.jwt.verify(value);
            if (!user) return ;

			await runAsync("UPDATE users SET connected = ? WHERE username = ? ", [false, user.username]);

            reply.clearCookie(user.username + '_token', {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
                path: '/',
            });
        } catch(err) {
            continue ;
        }
    }
};

const logoutUser = async (request, reply) =>  {
    try {
		const all_cookies = request.cookies;
        const { username } = request.body;
	    
        const runAsync = promisify(db.run).bind(db);

        if (username == "me") {
            await logoutAll(request, reply);
            return reply.send();
        } else {
            for (const [key, value] of Object.entries(all_cookies)) {
                const user = await request.server.jwt.verify(value);
                if (key != "me_token" && user.username != username) continue;
                if (key == "me_token" && user.username == username) {
                    await logoutAll(request, reply);
                    return reply.send();
                }

			    await runAsync("UPDATE users SET connected = ? WHERE username = ? ", [false, user.username]);

                reply.clearCookie(user.username + '_token', {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Strict',
                    path: '/',
                });
            }

        }
		return reply.send();
	} catch (err) {
		console.log(err);
        reply.status(401).send();
	} 
};

export { logoutUser };

