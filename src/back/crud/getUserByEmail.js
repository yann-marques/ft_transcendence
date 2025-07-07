import db from '../db.js'; // on importe notre db
import { promisify } from 'util';

const getAsync = promisify(db.get).bind(db); // rends le code plus lisible

const getUserByEmail = async (email) => 
{
	try 
	{
		const row = await getAsync("SELECT * FROM users WHERE email = ?", [email]);
		return row; // on a recupere les informations du user (dont email) dans row et on le return
	} 
	catch (err) 
	{
		// on affiche une erreur si il est passser dans le catch 
		console.error("Erreur DB (getUserByEmail):", err);
		return null;
	}
};

// on rends accesible ailleurs cette fonction 
export { getUserByEmail };





