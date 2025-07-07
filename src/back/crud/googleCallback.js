import { updateAvatarGoogle } from "./updateAvatarGoogle.js"
import { fastify } from "../server.js";
import { getUserByEmail } from "./getUserByEmail.js"
import { createUserFromGoogle } from "./postUserFromGoogle.js";
import db from '../db.js';
import { promisify } from 'util';


export const googleAuthCallback = async (request, reply) => {

	const token = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

	const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
		headers: {
			Authorization: `Bearer ${token.token.access_token}` // Token temporaire envoyé dans les headers
		}
	});

	const profile = await userInfoResponse.json();

	const existingUser = await getUserByEmail(profile.email);

	if (existingUser) {
		await updateAvatarGoogle(profile)	
	}

	if (!existingUser)
	{
		const success = await createUserFromGoogle(profile);
		if (!success)
			return reply.status(500).send({ message: "Erreur lors de la création de l'utilisateur Google." });
	}

	const user = existingUser || await getUserByEmail(profile.email);

	//console.log(user)

	const jwtToken = fastify.jwt.sign({
		id: user.id,
		username: user.username
	});

	const runAsync = promisify(db.run).bind(db);

	await runAsync(
        "UPDATE users SET login_token = ? WHERE username = ?",
        [jwtToken, user.username]
    );

	reply.setCookie('me_token', jwtToken, {
		httpOnly: true,
		secure: false, // false not https
		sameSite: 'strict',
		path: '/', // cookie is valid across entire site
		maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
	})

	reply.redirect('/');
}