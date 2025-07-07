import { Component } from "../decorators/component.js";
import { sendCustomization, toggleElt, updateUsers } from "../utils.js";
import { i18n } from "../common/i18n.js";
import { statsRow } from "./statsRow.js";

@Component({
  template: (props) => /* html */ `
	<div class="flex justify-between grow w-full flex-col p-5 py-7">

        <div id="popupStatsContent" class="flex flex-col max-w-full gap-8">

            <h1 class="text-white text-2xl font-bold">
  			    <span class="transition-all font-extrabold bg-gradient-to-r from-green-200 via-green-300 to-green-200 bg-clip-text text-transparent">${props.username}</span> ${i18n.t("stats.title")}
		    </h1> 

            <div class="flex max-h-[290px] justify-between">
                
                <div class="flex flex-col gap-4">
                    <div id="pieChart" class="flex flex-col"></div>
                    
                    <div class="flex flex-col items-baseline">
                        <h1 class="text-md text-start transition-all font-extrabold bg-gradient-to-r from-gray-500 via-gray-200 to-fuchsia-100 bg-clip-text text-transparent">${i18n.t("stats.total")}: <span id="totalText">0</span></h1>
                        <h1 class="text-md text-start transition-all font-extrabold bg-gradient-to-r from-gray-500 via-gray-200 to-fuchsia-100 bg-clip-text text-transparent">${i18n.t("player.winrate")} <span id="winrateText">0</span></h1>
                        <h1 class="text-md text-start transition-all font-extrabold bg-gradient-to-r from-gray-500 via-gray-200 to-fuchsia-100 bg-clip-text text-transparent">${i18n.t("stats.wins")}: <span id="winText" class="text-lg transition-all font-extrabold bg-gradient-to-r text-green-400 bg-clip-text">0</span></h1>
                        <h1 class="text-md text-start transition-all font-extrabold bg-gradient-to-r from-gray-500 via-gray-200 to-fuchsia-100 bg-clip-text text-transparent">${i18n.t("stats.losses")}: <span id="looseText" class="text-lg transition-all font-extrabold bg-gradient-to-r text-red-400 bg-clip-text">0</span></h1>
                    </div>
                </div>

                <div class="flex flex-col">
                    
                    <div class="relative overflow-y-auto overflow-x-hidden">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-3 pb-3 text-xs font-bold bg-gradient-to-r from-blue-500 via-blue-200 to-fuchsia-100 bg-clip-text text-transparent">
                                        ${i18n.t("stats.table.date")}
                                    </th>
                                    <th scope="col" class="px-3 pb-3 text-xs font-bold bg-gradient-to-r from-blue-500 via-blue-200 to-fuchsia-100 bg-clip-text text-transparent">
                                        ${i18n.t("stats.table.opponent")}
                                    </th>
                                    <th scope="col" class="px-3 pb-3 text-xs font-bold bg-gradient-to-r from-blue-500 via-blue-200 to-fuchsia-100 bg-clip-text text-transparent">
                                        ${i18n.t("stats.table.duration")}
                                    </th>
                                    <th scope="col" class="px-3 pb-3 text-xs font-bold bg-gradient-to-r from-blue-500 via-blue-200 to-fuchsia-100 bg-clip-text text-transparent">
                                        ${i18n.t("stats.table.winner")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="statsTableContent"></tbody>
                        </table>
                        <h1 id="noDataText" class="text-white text-center">No data for game history</h1>
                    </div>

                </div>

            </div> 

            
        </div>

	</div> 
	`
})
export class statsPopup {
	static render: any

	constructor(props) {
       
        const gameWin = props.gamesWin;
        const gameLoose = props.gamesLoose;
        
        const winText = document.getElementById('winText');    
        if (winText)
            winText.innerText = gameWin;
        
        const looseText = document.getElementById('looseText');
        if (looseText)
            looseText.innerText = gameLoose

        const totalText = document.getElementById('totalText');    
        if (totalText)
            totalText.innerText = gameWin + gameLoose;

        const winrateText = document.getElementById('winrateText');    
        if (winrateText)
            winrateText.innerText = props.winRate + '%';

        const statsTable = document.getElementById('statsTableContent');
        if (statsTable) {
            const gameHistory = props.gamesHistory as Array<{date, opponent, winner, duration}>;
            if (gameHistory.length != 0) {
                statsTable.innerHTML = ''
                toggleElt('noDataText')
            }

            gameHistory.forEach(game => {
                const duration = `${game.duration.minutes}m${game.duration.seconds}s`
                const statsRowElt = statsRow.render({date: game.date, opponent: game.opponent, duration: duration, winner: game.winner})
                statsTable.innerHTML += statsRowElt;
                new statsRow();
            })
        }

        var values = [gameWin, gameLoose];
        var labels = [i18n.t("stats.wins"), i18n.t("stats.losses")];
        var colors = ['#05df72', '#ef553b']


        if (gameWin === 0 && gameLoose === 0) {
            values = [1];
            labels = [i18n.t("stats.nodata")];
            colors = ['#d3d3d3'];
        }

        var data = [{
            values,
            labels,
            type: 'pie',
            marker: { colors }
        }]; 

        var layout = {
            height: 150,
            width: 150,
            showlegend: false,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            margin: { l: 0, r: 0, t: 0, b: 0 }
        };

        Plotly.newPlot('pieChart', data, layout, { displayModeBar: false });
    }
}