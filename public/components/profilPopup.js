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
const html = String.raw;
let profilePopup = class profilePopup {
    constructor(props) {
    }
};
profilePopup = __decorate([
    Component({
        template: (props) => html `
    <div class="flex justify-between grow w-full flex-col p-14">

        <div class="flex">
            <h1 class="text-white"><span class="text-white text-2xl font-bold">${props.username}</span> profile settings ⚙️</h1>
        </div>

        <div class="flex gap-4 w-full h-[220px]">

        </div>

    </div> 
    `
    }),
    __metadata("design:paramtypes", [Object])
], profilePopup);
export { profilePopup };
