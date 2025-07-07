import db from '../db.js';
import { promisify } from 'util';
import bcrypt from 'bcrypt';

const runAsync = promisify(db.run).bind(db);
const getAsync = promisify(db.get).bind(db);

export const updateSettings = async (request, reply) => {
    try {
		const all_cookies = request.cookies;
        const { username, email, fullname, password, confirmPassword } = request.body;
    
        const meToken = all_cookies['me_token'];
        if (!meToken) return reply.status(500).send();

        const meUser = request.server.jwt.verify(meToken);
        if (!meUser) return reply.status(500).send();

        const meRow = await getAsync("SELECT * FROM users WHERE username = ?", [meUser.username]);
		if (!meRow)
			return reply.code(401).send({ message: "Invalid credentials" });


        if (meUser.username != username) {
            const checkUserAlreadyExist = await getAsync("SELECT * FROM users WHERE username = ?", [username]);
            if (checkUserAlreadyExist)
                return reply.status(401).send();
        }
        
        if ((password != '' && confirmPassword == '') || (password == '' && confirmPassword != ''))
            return reply.status(401).send();
        
        if (password != '' && confirmPassword != '') {
            if (password != confirmPassword) {
                return reply.status(401).send();
            } else if (password.length < 8) {
                return reply.status(401).send();
            } else {
		        const hashedPassword = await bcrypt.hash(password, 10);
                await runAsync(
                    "UPDATE users SET password = ? WHERE id = ?",
                    [hashedPassword, meUser.id]
                )
            }
        }

      
        const token = reply.server.jwt.sign({ id: meUser.id, username: username });
		reply.setCookie('me_token', token, {
            httpOnly: true,
			secure: false, // false not https
			sameSite: 'strict',
			path: '/', // cookie is valid across entire site
			maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
		})

        await runAsync(
            "UPDATE users SET username = ?, email = ?, fullname = ?, login_token = ? WHERE id = ?",
            [username, email, fullname, token, meUser.id]
        )

        await runAsync(
            "UPDATE friends SET caller = ? WHERE caller = ?",
            [username, meUser.username]
        )

        await runAsync(
            "UPDATE friends SET target = ? WHERE target = ?",
            [username, meUser.username]
        )
    
        await runAsync(
            "UPDATE games SET winner = ? WHERE winner = ?",
            [username, meUser.username]
        )

        await runAsync(
            `UPDATE games
            SET users = REPLACE(users, ?, ?)
            WHERE users LIKE ?`,
            [`"${meUser.username}"`, `"${username}"`, `%\"${meUser.username}\"%`]
        );

        await runAsync(
            "UPDATE customizations SET username = ? WHERE username = ?",
            [username, meUser.username]
        )
        
        return reply.send({success: true});
    } catch (err) {
        console.log(err);
        return reply.status(500).send();
    }
}; 