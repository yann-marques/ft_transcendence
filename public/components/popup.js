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
import { closePopup } from "../utils.js";
let popup = class popup {
    constructor() {
        const closePopupElm = document.getElementById("closePopup");
        closePopupElm.addEventListener('click', () => {
            closePopup();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key == 'Escape')
                closePopup();
        });
    }
};
popup = __decorate([
    Component({
        template: /* html */ `
    <div id="popup" class="fixed z-999 invisible opacity-0 flex w-full h-full justify-center items-center">
        <div class="absolute w-full h-full backdrop-blur"></div>
        <div class="flex relative h-[400px] w-[700px] bg-black rounded-2xl border border-zinc-800">
            <div class="absolute right-5 top-5">
                <button id="closePopup" class="cursor-pointer">
                    <img class="w-[35px] h-[35px]" src="/static/icons/close.svg" />
                </button>
            </div>
            <div id="popupContent" class="flex flex-col w-full justify-center items-center"></div>
        </div>
    </div>
  `
    }),
    __metadata("design:paramtypes", [])
], popup);
export { popup };
