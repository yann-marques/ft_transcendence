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
import { toggleElt, toggleErrorText, updateAuthUserOnLobby } from "../utils.js";
import { i18n } from "../common/i18n.js";
let registerPopup = class registerPopup {
    constructor() {
        const formRegister = document.getElementById('formRegister');
        formRegister.addEventListener('submit', async function (e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                });
                const username = jsonData['username'];
                if (username == 'me' || username == 'AI') {
                    toggleErrorText('errorText', i18n.t("register.errorTakenUsername"));
                    return;
                }
                if (username.length >= 10) {
                    toggleErrorText('errorText', i18n.t("register.errorUsernameLong"));
                    return;
                }
                const password = jsonData['password'];
                const confirmPassword = jsonData['confirmPassword'];
                if (password != confirmPassword) {
                    toggleErrorText('errorText', i18n.t("register.errorSamePassword"));
                    return;
                }
                if (password.length < 8) {
                    toggleErrorText('errorText', i18n.t("register.errorPasswordLong"));
                    return;
                }
                if (!response.ok) {
                    toggleErrorText('errorText', i18n.t("register.error"));
                    return;
                }
                toggleElt('popup');
                await updateAuthUserOnLobby();
            }
            catch (error) {
                console.error('Error:', error);
            }
        });
    }
};
registerPopup = __decorate([
    Component({
        template: () => /* html */ `
    <div class="flex flex-col gap-5 w-full max-w-[600px] px-4">
            
        <div class="flex flex-col my-3 items-center h-[50px]">
            <h1 class="relative -translate-y-4 text-xl font-extrabold bg-gradient-to-r from-purple-400 via-purple-600 to-purple-700 bg-clip-text text-transparent self-center mb-0">
                ${i18n.t("register.title")}
            </h1>
            <h1 id="errorText" class="text-red-400 mt-5 invisible"></h1>
        </div>

        <form id="formRegister" class="flex flex-col gap-4">
            <input type="text" name="username" placeholder="${i18n.t("register.username")}" class="w-full text-white text-left transition shadow-md shadow-purple-500/60 inset-shadow-sm inset-shadow-purple-900 rounded-xl text-xs px-3 py-2.5 focus:outline-none">
            <input type="email" name="email" placeholder="${i18n.t("register.email")}" class="w-full text-white text-left transition shadow-md shadow-purple-500/60 inset-shadow-sm inset-shadow-purple-900 rounded-xl text-xs px-3 py-2.5 focus:outline-none">
            <input type="text" name="fullname" placeholder="${i18n.t("register.fullname")}" class="w-full text-white text-left transition shadow-md shadow-purple-500/60 inset-shadow-sm inset-shadow-purple-900 rounded-xl text-xs px-3 py-2.5 focus:outline-none">

            <div class="flex flex-row justify-between gap-4">
                <input type="password" name="password" placeholder="${i18n.t("register.password")}" class="flex-1 text-white text-left transition shadow-md shadow-purple-500/60 inset-shadow-sm inset-shadow-purple-700 rounded-xl text-xs px-3 py-2.5 focus:outline-none">
                <input type="password" name="confirmPassword" placeholder="${i18n.t("register.confirmPassword")}" class="flex-1 text-white text-left transition shadow-md shadow-purple-500/60 inset-shadow-sm inset-shadow-purple-700 rounded-xl text-xs px-3 py-2.5 focus:outline-none">
            </div>

            <input type="submit" class="w-60 cursor-pointer self-center mt-6 text-white font-extrabold transition bg-gradient-to-r from-purple-400 via-purple-600 to-purple-700 shadow-md hover:shadow-lg shadow-purple-500/60 hover:shadow-purple-400/60 inset-shadow-sm inset-shadow-purple-900 rounded-xl text-sm px-3 py-1.5 text-center me-2"
                value="${i18n.t("register.submit")}"
            />
        </form>
        
    </div>
    `
    }),
    __metadata("design:paramtypes", [])
], registerPopup);
export { registerPopup };
