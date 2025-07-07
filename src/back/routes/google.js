import { googleAuthCallback } from "../crud/googleCallback.js"

export default async function googleAuth(fastify, options) {
	fastify.get('/api/auth/google/callback', googleAuthCallback);
}