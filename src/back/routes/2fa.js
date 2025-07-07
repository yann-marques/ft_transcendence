import { disable2FAHandler } from '../crud/disable2fa.js';
import { enable2FAHandler } from '../crud/enable2fa.js'
import { verify2FAHandler } from '../crud/verify2fa.js'

export default async function twofaRoutes(fastify, options) {
	fastify.post('/api/enable-2fa', enable2FAHandler);
	fastify.post('/api/disable-2fa', disable2FAHandler);
	fastify.post('/api/verify-2fa', verify2FAHandler);
}