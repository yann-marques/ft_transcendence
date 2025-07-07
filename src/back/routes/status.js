import { statusHandler } from '../crud/status.js';

async function statusRoutes(fastify, options) {
	fastify.get('/api/status', {}, statusHandler);
}

export default statusRoutes;