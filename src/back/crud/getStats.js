import db from '../db.js';
import { promisify } from 'util';

const runAsync = promisify(db.run).bind(db);
const allAsync = promisify(db.all).bind(db);

export const getStats = async (request, reply) => {
    try {
		const all_cookies = request.cookies;
        const { username } = request.params;
    
        const meToken = all_cookies['me_token'];
        if (!meToken) return reply.status(500).send();

        const meUser = request.server.jwt.verify(meToken);
        if (!meUser) return reply.status(500).send();

        const allUserGames = await allAsync(
            `
            SELECT * FROM games 
            WHERE users LIKE ? OR users LIKE ? OR users LIKE ?
            `,
            [`%["${username}",%`, `%,"${username}",%`, `%,"${username}"]%`]
        );

        let nbWin = 0;
        let nbLoose = 0;
        let gamesHistory = [];

        function getOtherUser(raw, known) {
            return raw
                .slice(1, -1)
                .split(',')
                .map(s => s.trim().replace(/^['"]?(.*?)['"]?$/, '$1'))
                .find(u => u !== known) || '';
        }

        function getDuration(createdAt, endAt) {
            const start = new Date(createdAt).getTime();
            const end = new Date(endAt).getTime();
            const diffMs = end - start;

            const seconds = Math.floor(diffMs / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);

            return {
                milliseconds: diffMs,
                seconds,
                minutes,
                hours
            };
        }

        
        for (const row of allUserGames) {
            if (!row.finished) continue ;
            if (!row.winner) continue ;
            
            if (row.winner != null && row.winner == username)
                nbWin++;
            else
                nbLoose++;

            gamesHistory.push({date: row.created_at, opponent: getOtherUser(row.users, username), duration: getDuration(row.created_at, row.end_at), winner: row.winner})
        }

        let winRate = (nbWin / (nbWin + nbLoose)) * 100;
        if (!winRate)
            winRate = 0

        return reply.send({gamesWin: nbWin, gamesLoose: nbLoose, winRate: winRate.toFixed(2), gamesHistory: gamesHistory});


    } catch (err) {
        console.log(err);
        return reply.status(500).send();
    }
};

export async function getWinrate(username) {
   try {
        const allUserGames = await allAsync(
            `
            SELECT * FROM games 
            WHERE users LIKE ? OR users LIKE ? OR users LIKE ?
            `,
            [`%["${username}",%`, `%,"${username}",%`, `%,"${username}"]%`]
        );

        let nbWin = 0;
        let nbLoose = 0;

        for (const row of allUserGames) {
            if (!row.finished) continue ;
            if (!row.winner) continue ;
            
            if (row.winner != null && row.winner == username)
                nbWin++;
            else
                nbLoose++;
        }

        let winRate = (nbWin / (nbWin + nbLoose)) * 100;
        if (!winRate)
            winRate = 0;

        return winRate.toFixed(2);
    
    } catch (err) {
        console.log(err);
   }
}