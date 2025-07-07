var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { i18n } from "../common/i18n.js";
import { Component } from "../decorators/component.js";
import { setPopupContent, toggleElt, toggleErrorText, updateAuthUserOnLobby } from "../utils.js";
import { registerPopup } from "./registerPopup.js";
import { verifTwofaContent } from "./verifTwofaContent.js";
let loginPopup = class loginPopup {
    constructor() {
        const formLogin = document.getElementById('formLogin');
        formLogin.addEventListener('submit', async function (e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                });
                if (!response.ok) {
                    toggleErrorText('errorText', i18n.t("login.error"));
                    return;
                }
                const data = await response.json();
                if (data.need_2fa) {
                    const twofaContentElt = verifTwofaContent.render();
                    setPopupContent(twofaContentElt);
                    new verifTwofaContent({ closePopup: true });
                }
                else {
                    toggleElt('popup');
                }
                await updateAuthUserOnLobby();
            }
            catch (error) {
                console.error('Error:', error);
            }
        });
        const registrationButton = document.getElementById("registrationButton");
        registrationButton.addEventListener('click', () => {
            const registerContent = registerPopup.render();
            setPopupContent(registerContent);
            new registerPopup();
        });
    }
};
loginPopup = __decorate([
    Component({
        template: () => {
            return /* html */ `
    <div class="flex flex-col gap-5">
        <div class="flex flex-col my-3 items-center h-[50px]">
            <h1 class="relative text-xl font-extrabold bg-gradient-to-l from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent self-center mb-0">
                ${i18n.t("login.title")}
            </h1>
            <h1 id="errorText" class="text-red-400 mt-5 invisible"></h1>
        </div> 
        
        <form id="formLogin" class="flex flex-col gap-2.5">
            <input type="text" placeholder="${i18n.t("login.username")}" name="username" 
              class="w-90 text-white autofill:bg-transparent bg-transparent placeholder:text-white transition shadow-md shadow-green-500/60 inset-shadow-sm inset-shadow-green-900 rounded-xl text-xs px-3 py-2.5 me-2 mb-2 focus:outline-none" />
            
            <input type="password" placeholder="${i18n.t("login.password")}" name="password" 
              class="w-90 text-white autofill:bg-transparent bg-transparent placeholder:text-white transition shadow-md shadow-green-500/60 inset-shadow-sm inset-shadow-green-900 rounded-xl text-xs px-3 py-2.5 me-2 mb-2 focus:outline-none" />
            
            <input type="submit" value="${i18n.t("login.submit")}" 
              class="w-40 cursor-pointer self-center text-white font-bold transition bg-gradient-to-r from-green-400 via-green-600 to-green-700 shadow-md hover:shadow-lg shadow-green-500/60 hover:shadow-green-400/60 inset-shadow-sm inset-shadow-green-900 rounded-xl text-sm px-3 py-1.5 text-center me-2" />
        </form>
        
        <span class="self-center mt-[10px] text-sm font-semibold bg-gradient-to-l from-purple-300 via-purple-500 to-purple-300 bg-clip-text text-transparent my-0.5">
            ${i18n.t("login.noAccount")}
        </span>
        
        <a id="registrationButton" 
          class="w-40 cursor-pointer self-center text-white font-bold transition bg-gradient-to-r from-purple-400 via-purple-600 to-purple-700 shadow-md hover:shadow-lg shadow-purple-500/60 hover:shadow-purple-400/60 inset-shadow-sm inset-shadow-purple-900 rounded-xl text-sm px-3 py-1.5 text-center me-2">
            ${i18n.t("login.registerLink")}
        </a>
    </div>`;
        }
    }),
    __metadata("design:paramtypes", [])
], loginPopup);
export { loginPopup };
