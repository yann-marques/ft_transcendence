import { Component } from "../decorators/component.js";
import { sendCustomization, toggleStats } from "../utils.js";
import { i18n } from "../common/i18n.js";


@Component({
    template: (props) => /* html */ `
        <div class="flex gap-2 justify-center items-center">
            <div class="flex justify-center min-w-[70px] p-1 border border-zinc-500 rounded shadow-[_0_5px_15px_rgba(204,_204,_204,_1)]">
                <a name="playersMatchLink" username=${props.player1} class="text-white text-xs hover:underline cursor-pointer">${props.player1}</a> 
            </div>
            <div class="flex justify-center">
                <h1 class="text-sm font-bold bg-gradient-to-r from-blue-500 via-blue-200 to-fuchsia-100 bg-clip-text text-transparent">${i18n.t("match.vs")}</h1>
            </div>
            <div class="flex justify-center min-w-[70px] p-1 border border-zinc-500 rounded shadow-[_0_5px_15px_rgba(204,_204,_204,_1)]">
                <a name="playersMatchLink" username=${props.player2} class="flex text-white text-xs hover:underline cursor-pointer">${props.player2}</a> 
            </div>
        </div> 
    `
})
export class lobbyMatchPlayer {
    static render: any

    constructor() {

        const playersMatchLink = document.getElementsByName("playersMatchLink");
        for (const link of Array.from(playersMatchLink)) {
        
            link.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const username = target.getAttribute('username');
                toggleStats(username, true);
            })
            
        }

        
    }
}