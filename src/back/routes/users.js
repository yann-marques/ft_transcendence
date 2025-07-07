import { addUserHandler, addUserSchema } from '../crud/postUser.js';
import { getAuthUsers, getUsers } from '../crud/getUsers.js';
import { getUserById } from '../crud/getUserById.js'
import { loginUserHandler } from '../crud/loginUser.js';
import { registerUserHandler } from '../crud/registerUser.js'
import { statusHandler } from '../crud/status.js';
import { logoutUser } from '../crud/logoutUser.js';
import { checkPassword } from '../crud/checkPassword.js';
import { postAvatar } from '../crud/postAvatar.js';
import { addFriend } from '../crud/addFriend.js';
import { getFriends } from '../crud/getFriends.js';
import { updateSettings } from '../crud/updateSettings.js';
import { getSettings } from '../crud/getSettings.js';
import { updateLanguageHandler } from '../crud/updateLanguage.js';
import { getStats } from '../crud/getStats.js';
import { addWinner } from '../crud/addWinner.js';

export default async function usersRoutes(fastify, options) 
{
	fastify.get('/api/getUsers', getUsers);

	fastify.post('/api/login', loginUserHandler);
	fastify.post('/api/register', registerUserHandler);
	fastify.post('/api/logoutUser', logoutUser);
	fastify.post('/api/checkPassword', checkPassword);
	fastify.get('/api/getAuthUsers', getAuthUsers);

	//Friends
	fastify.post('/api/addFriend', addFriend);
	fastify.get('/api/getFriends', getFriends);

	//Settings
	fastify.post('/api/uploadAvatar', postAvatar);
	fastify.post('/api/updateSettings', updateSettings);
	fastify.get('/api/getSettings', getSettings);
	fastify.put('/api/user/language', updateLanguageHandler);

	//Stats
	fastify.get('/api/getStats/:username', getStats);
	fastify.post('/api/addWinner', addWinner);
}