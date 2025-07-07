import db from '../db.js';

export const postCustom  = (request, reply) =>
{
    try {
        const {username, color, powerup, mapevents} = request.body;
    
        const meToken = request.cookies['me_token'];
        const meUser = request.server.jwt.verify(meToken);
        if (meUser.username != username) {
            const token = request.cookies[username + '_token'];
            if (!token)
                return reply.status(401).send({ message: "The user" + username + "must be connected" });
        }
    
        const fields = ['username'];
        const placeholders = ['?'];
        const values = [username];
        
        if (typeof color === 'string') {
            fields.push('color');
            placeholders.push('?');
            values.push(color);
        }
    
        if (typeof powerup === 'boolean') {
            fields.push('powerup');
            placeholders.push('?');
            values.push(powerup ? 1 : 0);
        } else if (powerup != null) {
            return reply.status(400).send({ message: "powerup must be a boolean" });
        }
    
        if (typeof mapevents === 'boolean') {
            fields.push('mapevents');
            placeholders.push('?');
            values.push(mapevents ? 1 : 0);
        } else if (mapevents != null) {
            return reply.status(400).send({ message: "mapevents must be a boolean" });
        }    
    
        const updates = fields
            .filter(f => f !== 'username')
            .map(f => `${f} = excluded.${f}`)
            .join(', ');
    
        const query = `
            INSERT INTO customizations (${fields.join(', ')})
            VALUES (${placeholders.join(', ')})
            ON CONFLICT(username) DO UPDATE SET
            ${updates}
        `;
    
        db.run(query, values, (err) => {
            console.log(err);
            if (err)
                return reply.status(500).send({ message: "database error" });
            return reply.status(200).send({ message: "Customization inserted or updated" });
        });

    } catch (err) {
        console.log(err);
        return reply.status(500).send();
    }
	

	
}; 