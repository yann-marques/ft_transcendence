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
function renderOwnerIcon(props) {
    return `
    <div class="flex">
      ${props.host == true ? '<div class="flex"><img class="w-[18px] h-[18px]" src="/static/icons/crown.svg" /></div>' : ''}
    </div>
  `;
}
function renderCustomizationIcon(props) {
    if (props.host == true) {
        return `
            <div class="flex items-center">
                <button name="customizationLobby" data="${props.username}" class="cursor-pointer">
                    <img class="h-[23px] w-[23px] max-[875px]:w-[16px] max-[875px]:h-[16px] rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS10CLHLV36UQ1gsvVnZ4ndIL-Z_RPQKsSSQ&s"/>
                </button>    
            </div>
        `;
    }
    else {
        return `
            <div class="flex items-center">
                <label name="labelColorPicker" data=${props.username} class="block w-[23px] h-[23px] max-[875px]:w-[16px] max-[875px]:h-[16px] border border-zinc-500 rounded-2xl bg-[#6590D5] cursor-pointer">
                    <input type="color" name="colorPicker" value="#6590D5" class="opacity-0 w-0 h-0" />
                </label>
            </div> 
        `;
    }
}
let lobbyPlayer = class lobbyPlayer {
    constructor() {
        const playersLink = document.getElementsByName("playersLink");
        for (const link of Array.from(playersLink)) {
            link.addEventListener('click', (e) => {
                const target = e.target;
                const username = target.getAttribute('username');
                toggleStats(username, true);
            });
        }
    }
};
lobbyPlayer = __decorate([
    Component({
        template: (props) => /* html */ `
        <div class="flex items-center gap-4 max-[875px]:gap-2">
            ${renderCustomizationIcon(props)} 
            <div class="flex w-[350px] max-[875px]:w-[250px] justify-between items-center gap-2 px-2 border border-zinc-500 rounded h-8 shadow-[_0_5px_15px_rgba(204,_204,_204,_1)]">
                <div class="flex items-center gap-2">
                    <div class="flex">
                        <img class="h-[22px] w-[22px] rounded-full" src="${props.avatar}"/>
                    </div>
                    <div class="flex">
                        <a name="playersLink" username=${props.username} class="text-white text-xs hover:underline cursor-pointer">${props.username}</a> 
                    </div>
                    ${renderOwnerIcon(props)}
                </div>
                <div class="flex">
                    <h1 class="text-white text-xs">${i18n.t("player.winrate")} <span class="text-sm max-[875px]:text-xs font-bold bg-gradient-to-r from-blue-500 via-blue-200 to-fuchsia-100 bg-clip-text text-transparent">${props.winRate}%</span></h1>
                </div>
            </div>
            <div class="flex">
                <button name="logoutUser" username='${props.username}' isMe='${props.host}' class="cursor-pointer">
                    <img class="h-[23px] w-[23px] max-[875px]:w-[16px] max-[875px]:h-[16px] rounded-full fill-red-400" src="/static/icons/close.svg"/>
                </button>    
            </div>
        </div>
    `
    }),
    __metadata("design:paramtypes", [])
], lobbyPlayer);
export { lobbyPlayer };
