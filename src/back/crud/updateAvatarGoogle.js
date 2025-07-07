import db from '../db.js';
import { promisify } from 'util';

const runAsync = promisify(db.run).bind(db)


async function blobToBase64(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:image;base64,${buffer.toString('base64')}`;
}

export const updateAvatarGoogle = async (profile) => {

    const response = await fetch(profile.picture);
	const blob = await response.blob();
	const avatarBase64 = await blobToBase64(blob);

    try {
        await runAsync(
            "UPDATE users SET avatar = ? WHERE email = ?",
            [avatarBase64, profile.email]
        ); 
    } catch (err) {
        console.log(err);
        return reply.status(500).send();
    }
}; 