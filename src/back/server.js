// Import des dépendances
import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import fastifyOauth2 from '@fastify/oauth2';



// Import des routes
import usersRoutes from './routes/users.js';
import twofaRoutes from './routes/2fa.js';
import statusRoutes from './routes/status.js';
import customizationRoutes from './routes/customization.js';
import googleAuth from './routes/google.js';
import gamesRoutes from './routes/games.js';

import fs from 'fs';

// Chargement des variables d'environnement
dotenv.config();

const cert = process.env.SSL_CERTIFICATE.replace(/\\n/g, '\n');
const key = process.env.SSL_PRIVATE_KEY.replace(/\\n/g, '\n');

// Création de l'app Fastify
export const fastify = Fastify({
	https: {
    	key: key,
    	cert: cert 
  	},
	logger: true
});

// Middleware : cookies
fastify.register(cookie, {
	secret: process.env.JWT_SECRET,
});

// Middleware : JWT + méthode authenticate()
fastify.decorate("authenticate", async function (request, reply) {
	try {
		await request.jwtVerify();
	} catch (err) {
		reply.send(err);
	}
});

// 2️⃣ Puis sert tous les fichiers statiques (JS, CSS, HTML, images...)
fastify.register(fastifyStatic, {
	root: path.join(process.cwd(), 'public'),
});


// 3️⃣ Gère les routes non trouvées (SPA fallback vers index.html)
fastify.setNotFoundHandler((request, reply) => {
	if (!request.raw.url.startsWith('/api')) {
		reply.type('text/html').sendFile('index.html');
	}
});

// Authentification JWT
fastify.register(fastifyJwt, {
	secret: process.env.JWT_SECRET
});

fastify.register(fastifyOauth2, {
	name: 'googleOAuth2',
	scope: ['profile', 'email'],
	credentials: {
		client: {
			id: process.env.GOOGLE_CLIENT_ID,
			secret: process.env.GOOGLE_CLIENT_SECRET
		},
		auth: fastifyOauth2.GOOGLE_CONFIGURATION
	},
	startRedirectPath: '/api/auth/google',
	callbackUri: process.env.GOOGLE_CALLBACK_URL
});


// 🔐 TOTP avec otplib
fastify.decorate('totp', {
	generateSecret: () => authenticator.generateSecret(),
	generateQRCode: async ({ secret }) => {
		const otpauth = authenticator.keyuri('ft_transcendence', 'TOTP', secret);
		return await qrcode.toDataURL(otpauth);
	},
	verify: ({ secret, token }) => authenticator.verify({ secret, token })
});

// Routes de l'API
fastify.register(twofaRoutes);
fastify.register(usersRoutes);
fastify.register(customizationRoutes);
fastify.register(statusRoutes);
fastify.register(googleAuth);
fastify.register(gamesRoutes);


// Lancement du serveur
try {
	await fastify.listen({ port: 3000, host: '0.0.0.0' });
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
