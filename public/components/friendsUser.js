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
function renderConnected(props) {
    if (props.connected == true) {
        return `
            <div class="w-[10px] h-[10px] rounded-full bg-green-400"></div> 
        `;
    }
    else {
        return `
            <div class="w-[10px] h-[10px] rounded-full bg-red-400"></div> 
        `;
    }
}
let friendsUser = class friendsUser {
    constructor() {
        const friendsLink = document.getElementsByName("linkFriend");
        for (const link of Array.from(friendsLink)) {
            link.addEventListener('click', (e) => {
                const target = e.target;
                const username = target.getAttribute('username');
                toggleStats(username, true);
            });
        }
    }
};
friendsUser = __decorate([
    Component({
        template: (props) => /* html */ `

    <div class="flex items-center gap-4">
        <div class="flex justify-between items-center gap-2 px-2 rounded h-8">
            <div class="flex items-center gap-2">
                <div class="flex">
                    <img class="h-[22px] w-[22px] rounded-full" src="${props.avatar}"/>
                </div>
                <div class="flex">
                    <a name="linkFriend" username=${props.username}  class="text-white text-xs hover:underline cursor-pointer">${props.username}</a> 
                </div>
            </div>
            <div class="flex">
                ${renderConnected({ connected: props.connected })}
            </div>
        </div>
    </div>
    `
    }),
    __metadata("design:paramtypes", [])
], friendsUser);
export { friendsUser };
