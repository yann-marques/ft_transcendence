import db from '../db.js';
import { promisify } from 'util';

const runAsync = promisify(db.run).bind(db);

async function blobToBase64(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:image;base64,${buffer.toString('base64')}`;
}

const createUserFromGoogle = async (profile) => {

	const response = await fetch(profile.picture);
	const blob = await response.blob();
	const base64 = await blobToBase64(blob);

	try {
		await runAsync(
			'INSERT INTO users (username, email, fullname, password, twofa_enable, connected, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)',
			[
				profile.given_name || profile.name,
				profile.email,
				profile.name,
                'google-oauth',
				false,
				true,
				base64
			]
		);
		await runAsync("INSERT INTO customizations(username, color, powerup, mapevents) VALUES (?, ?, ?, ?)", [profile.given_name || profile.name, '#ffffff', false, false]);
		return true;
	} catch (err) {
		console.error("Erreur DB (createUserFromGoogle):", err);
		return false;
	}
};

export { createUserFromGoogle };