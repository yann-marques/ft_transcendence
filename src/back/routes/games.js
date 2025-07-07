import { createGame } from "../crud/createGame.js";

export default async function gamesRoutes(fastify, options) 
{
	fastify.post('/api/createGame', createGame);
}