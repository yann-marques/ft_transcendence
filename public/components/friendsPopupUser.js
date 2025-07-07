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
import { addFriend, toggleStats } from "../utils.js";
let friendsPopupUser = class friendsPopupUser {
    constructor() {
        const userAdd = document.getElementsByName("userAdd");
        for (const link of Array.from(userAdd)) {
            link.addEventListener('click', (e) => {
                const target = e.target;
                const username = target.getAttribute('username');
                addFriend(username);
            });
        }
        const userLink = document.getElementsByName("userLink");
        for (const link of Array.from(userLink)) {
            link.addEventListener('click', (e) => {
                const target = e.target;
                const username = target.getAttribute('username');
                toggleStats(username, false);
            });
        }
    }
};
friendsPopupUser = __decorate([
    Component({
        template: (props) => /* html */ `

    <div class="flex flex-col gap-2 items-center py-2 w-[130px] justify-center border rounded-2xl border-green-500 shadow-lg shadow-green-500/50 bg-green-500/50">
        <div class="flex">
            <img class="flex w-[50px] h-[50px] object-fit rounded-full" src="${props.avatar}"/>
        </div>
        <a name="userLink" username=${props.username} class="text-white text-xs font-bold cursor-pointer hover:underline">${props.username}</a>

        <button name="userAdd" username=${props.username} class="flex cursor-pointer text-center text-xs border font-bold text-white items-center p-0.5 px-4 bg-[conic-gradient(at_top,_#b5b5b5,_#232323,_#4d4d4d)] rounded">
            Add
        </button>
    </div>
    
    `
    }),
    __metadata("design:paramtypes", [])
], friendsPopupUser);
export { friendsPopupUser };
