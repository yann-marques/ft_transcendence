var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "../decorators/component.js";
import { i18n } from "../common/i18n.js";
let footer = class footer {
};
footer = __decorate([
    Component({
        template: () => /* html */ `
    <div class="flex w-full py-2 justify-center text-center bg-black shadow-[_0_20px_50px_rgba(204,_204,_204,_1)]">
        <div class="flex">
            <h1 class="text-white text-sm">2025 @ <span class="font-extrabold bg-gradient-to-r from-orange-500 via-blue-500 to-teal-500 text-transparent bg-clip-text">ft_transcendence</span> ${i18n.t("footer.credits")}</h1>
        </div>
    </div>
  `
    })
], footer);
export { footer };
