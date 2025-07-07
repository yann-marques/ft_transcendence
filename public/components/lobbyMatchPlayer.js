var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "../decorators/component.js";
import { toggleStats } from "../utils.js";
import { i18n } from "../common/i18n.js";
let lobbyMatchPlayer = class lobbyMatchPlayer {
    constructor() {
        const playersMatchLink = document.getElementsByName("playersMatchLink");
        for (const link of Array.from(playersMatchLink)) {
            link.addEventListener('click', (e) => {
                const target = e.target;
                const username = target.getAttribute('username');
                toggleStats(username, true);
            });
        }
    }
};
lobbyMatchPlayer = __decorate([
    Component({
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
    }),
    __metadata("design:paramtypes", [])
], lobbyMatchPlayer);
export { lobbyMatchPlayer };
