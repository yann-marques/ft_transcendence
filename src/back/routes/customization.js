import { postCustom } from '../crud/postCustom.js';
import { getAuthUsersCustom } from '../crud/getCustom.js';

export default async function customizationRoutes(fastify, options) {
	fastify.post('/api/setCustomization', postCustom);
	fastify.get('/api/getAuthUsersCustom', getAuthUsersCustom);
}