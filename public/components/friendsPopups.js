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
import { updateUsers } from "../utils.js";
import { i18n } from "../common/i18n.js";
let friendsPopup = class friendsPopup {
    constructor(props) {
        updateUsers();
    }
};
friendsPopup = __decorate([
    Component({
        template: () => /* html */ `
	<div class="flex justify-between grow w-full flex-col p-14">

        <div id="popupFriendsContent" class="flex flex-col max-w-full gap-4">

            <h1 class="text-xl transition-all font-extrabold bg-gradient-to-r from-green-200 via-green-300 to-green-200 bg-clip-text text-transparent">
                ${i18n.t("friends.add")}
            </h1>

            <div style="height: 260px" class="overflow-y-auto">

                <div id="listUser" style="flex-wrap: wrap" class="flex flex-wrap gap-4 overflow-y-auto py-7 max-h-[260px] w-full"><h1 class="text-white">No user to add</h1><div>
            
            </div>

            
        </div>

	</div> 
	`
    }),
    __metadata("design:paramtypes", [Object])
], friendsPopup);
export { friendsPopup };
