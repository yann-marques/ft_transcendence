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
import { sendCustomization } from "../utils.js";
const html = String.raw;
let customPopup = class customPopup {
    constructor(props) {
        const colorPicker = document.getElementById("colorPicker");
        const labelColorPicker = document.getElementById("labelColorPicker");
        const checkBoxPowerup = document.getElementById("checkboxPowerup");
        const checkboxMapevents = document.getElementById("checkboxMapevents");
        const dataCustoms = JSON.parse(localStorage.getItem('customPlayer'));
        const dataPlayer = dataCustoms.find((user) => user.username === props.username) || null;
        if (dataPlayer) {
            colorPicker.value = dataPlayer.color;
            checkBoxPowerup.checked = dataPlayer.powerup;
            checkboxMapevents.checked = dataPlayer.mapevents;
        }
        labelColorPicker.style.backgroundColor = colorPicker.value;
        colorPicker.addEventListener("input", () => {
            labelColorPicker.style.backgroundColor = colorPicker.value;
        });
        colorPicker.addEventListener("change", () => {
            sendCustomization({ username: props.username, color: colorPicker.value });
        });
        checkBoxPowerup.addEventListener('change', (e) => {
            const target = e.target;
            sendCustomization({ username: props.username, powerup: target.checked });
        });
        checkboxMapevents.addEventListener('change', (e) => {
            const target = e.target;
            sendCustomization({ username: props.username, mapevents: target.checked });
        });
    }
};
customPopup = __decorate([
    Component({
        template: (props) => html `
    <div class="flex justify-between grow w-full flex-col p-14">

        <div class="flex">
            <h1 class="text-white"><span class="text-white text-2xl font-bold">${props.username}</span> customization ⚙️</h1>
        </div>

        <div class="flex gap-4 w-full h-[220px]">
            <div class="flex flex-1 flex-col h-full items-center gap-2">
                <label id="labelColorPicker" class="block w-full h-full border border-zinc-500 rounded-2xl bg-[#6590D5] cursor-pointer">
                    <input type="color" id="colorPicker" value="#6590D5" class="opacity-0 w-0 h-0" />
                </label>
                <h1 class="flex text-white">Choose color</h1>
            </div>
            <div class="flex flex-1 flex-col h-full items-center gap-2">
                <div class="w-full h-full flex flex-col rounded-2xl border border-zinc-500 items-center justify-center">
                    <img class="w-[100px] h-[100px]" src="/static/icons/speedup.svg">
                    <label class="flex items-center cursor-pointer relative" for="checkboxPowerup">
                        <input type="checkbox"
                            checked
                            class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-400 checked:border-green-300"
                            id="checkboxPowerup" />
                        <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                stroke="currentColor" stroke-width="1">
                                <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                </div>
                <h1 class="flex text-white">PowerUP</h1>
            </div> 
            <div class="flex flex-1 flex-col h-full items-center gap-2">
                <div class="w-full h-full flex flex-col rounded-2xl border border-zinc-500 items-center justify-center">
                    <img class="w-[100px] h-[100px]" src="/static/icons/mapevent.svg">
                    <label class="flex items-center cursor-pointer relative" for="checkboxMapevents">
                        <input type="checkbox"
                            checked
                            class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-400 checked:border-green-300"
                            id="checkboxMapevents" />
                        <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                stroke="currentColor" stroke-width="1">
                                <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                </div>
                <h1 class="flex text-white">Map Events</h1>
            </div>  
        </div>

    </div> 
    `
    }),
    __metadata("design:paramtypes", [Object])
], customPopup);
export { customPopup };
