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
import { disable2fa, fillProfile, getQRCode, toggleElt, toggleErrorText, updateStatus, uploadAvatar } from "../utils.js";
import { activateTwofaContent } from "./activateTwofaContent.js";
let profilePopup = class profilePopup {
    constructor() {
        const formUnlockProfile = document.getElementById('formUnlockProfile');
        formUnlockProfile.addEventListener('submit', async function (e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            try {
                const response = await fetch('/api/checkPassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                });
                if (!response.ok) {
                    toggleErrorText('errorTextProfileLock', i18n.t("profile.wrongPassword"));
                    return;
                }
                toggleElt('settingsContent');
                toggleElt('profileLockContent');
            }
            catch (error) {
                console.error('Error:', error);
            }
        });
        updateStatus();
        const dataMe = JSON.parse(localStorage.getItem('me'));
        if (!dataMe)
            return;
        fillProfile();
        const avatar = document.getElementById('avatar');
        const fileInput = document.getElementById('fileInput');
        const twofaCheckbox = document.getElementById('checkboxTwofa');
        twofaCheckbox.checked = dataMe['twofa'];
        twofaCheckbox.addEventListener('click', async (e) => {
            if (!twofaCheckbox.checked) {
                await disable2fa();
            }
            else {
                const QRCodeImg = (await getQRCode());
                toggleElt('settingsContent');
                const QRCodeEl = document.getElementById('QRCode');
                QRCodeEl.src = QRCodeImg;
                new activateTwofaContent();
                toggleElt('activate2faContent');
            }
        });
        avatar.src = dataMe['avatar'];
        avatar.addEventListener('click', () => {
            fileInput.click();
        });
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
                const reader = new FileReader();
                reader.onload = async function (e) {
                    const imgBas64 = e.target.result;
                    avatar.src = imgBas64;
                    await uploadAvatar(imgBas64);
                    await updateStatus();
                };
                reader.readAsDataURL(file); // Convert to base64
            }
            else {
                alert('Please select a PNG or JPEG image.');
            }
        });
        const formUpdateProfile = document.getElementById('formProfile');
        formUpdateProfile.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            try {
                const response = await fetch('/api/updateSettings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                });
                const username = jsonData['username'];
                if (username == 'me' || username == 'AI') {
                    toggleErrorText('errorTextProfileSettings', i18n.t("register.errorTakenUsername"));
                    return;
                }
                if (username.length >= 10) {
                    toggleErrorText('errorTextProfileSettings', i18n.t("register.errorUsernameLong"));
                    return;
                }
                const password = jsonData['password'];
                const confirmPassword = jsonData['confirmPassword'];
                if ((password || confirmPassword) && password != confirmPassword) {
                    toggleErrorText('errorTextProfileSettings', i18n.t("register.errorSamePassword"));
                    return;
                }
                if ((password || confirmPassword) && password.length < 8) {
                    toggleErrorText('errorTextProfileSettings', i18n.t("register.errorPasswordLong"));
                    return;
                }
                if (!response.ok) {
                    toggleErrorText('errorTextProfileSettings', i18n.t("profile.usernameEmailTaken"));
                    return;
                }
                toggleErrorText('successTextProfileSettings', i18n.t("profile.success"));
            }
            catch (error) {
                console.error('Error:', error);
            }
        });
    }
};
profilePopup = __decorate([
    Component({
        template: (props) => /* html */ `
    <div class="flex justify-between grow w-full flex-col p-14">

        <div id="popupProfileContent" class="flex flex-col justify-between grow gap-8">

            <div id="profileLockContent" class="flex flex-col w-full h-full items-center justify-center gap-8">
                <div class="flex flex-col justify-center items-center">
                    <img class="w-[150px] h-[150px]" src="/static/icons/lock.svg" />
                    <h1 id="errorTextProfileLock" class="text-red-400 invisible"></h1>
                </div>
                <div>
                    <form id="formUnlockProfile" class="flex flex-col gap-2 min-w-[350px] justify-between">
                        <div class="flex gap-2">
                            <input type="password" id="passwordUnlockProfile" name="password" placeholder="${i18n.t("profile.password")}" class="w-full text-center text-white placeholder:text-white transition border rounded-xl text-xs px-3 py-2.5 focus:outline-none">
                        </div>
                        <input type="submit" value="${i18n.t("profile.unlock")}" class="flex cursor-pointer min-w-[225px] self-center mt-3 text-black bg-white rounded-xl text-sm px-3 py-1.5 text-center" />
                    </form>
                </div>
            </div>

            ${activateTwofaContent.render()}

            <div id="settingsContent" class="flex flex-col hidden invisible gap-4">
                <div class="flex">
                    <h1 class="text-white"><span class="text-white text-2xl font-bold">${props.username}</span> ${i18n.t("profile.title")}</h1>
                </div>

                <div class="flex gap-10 w-full min-h-[250px] min-w-[400px] justify-between">
                    
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col justify-center items-center gap-1">
                            <img id="avatar" class="cursor-pointer rounded-full h-[120px] w-[120px]" src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png" alt="User Avatar" />
                            <input type="file" id="fileInput" class="hidden"  accept="image/png, image/jpeg" />
                            <h1 class="flex text-white text-xs">${i18n.t("profile.changeAvatar")}</h1>
                        </div>

                        <div class="flex flex-1 flex-col h-full items-center gap-2">
                            <div class="w-[90px] h-[90px] flex flex-col gap-2 rounded-2xl border border-zinc-500 items-center justify-center">
                                <img class="w-[40px] h-[40px]" src="/static/icons/2fa.svg">
                                <label class="flex items-center cursor-pointer relative" for="checkboxTwofa">
                                    <input type="checkbox"
                                        checked
                                        class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-400 checked:border-blue-300"
                                        id="checkboxTwofa" />
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
                            <h1 class="flex text-white">${i18n.t("profile.enable2fa")}</h1>
                        </div> 

                    </div>

                    <form id="formProfile" class="flex flex-col gap-10 min-w-[410px]">
                        
                        <div>
                            <h1 id="errorTextProfileSettings" class="text-red-400 text-center invisible"></h1>
                            <h1 id="successTextProfileSettings" class="text-green-400 text-center invisible"></h1>
                        </div>

                        <div class="flex flex-col gap-3">

                            <div class="flex flex-col gap-3">
                                <input type="text" name="username" id="profileUsername" placeholder="${i18n.t("profile.username")}" class="w-full text-white placeholder:text-white  text-left transition shadow-md shadow-blue-500/60 inset-shadow-sm inset-shadow-blue-900 rounded-xl text-xs px-3 py-2.5 focus:outline-none">
                                <div class="flex gap-2">
                                    <input type="email" name="email" id="profileEmail" placeholder="${i18n.t("profile.email")}" class="w-full text-white placeholder:text-white  text-left transition shadow-md shadow-blue-500/60 inset-shadow-sm inset-shadow-blue-900 rounded-xl text-xs px-3 py-2.5 focus:outline-none">
                                    <input type="text" name="fullname" id="profileFullname" placeholder="${i18n.t("profile.fullname")}" class="w-full text-white placeholder:text-white text-left transition  shadow-md shadow-blue-500/60 inset-shadow-sm inset-shadow-blue-900 rounded-xl text-xs px-3 py-2.5 focus:outline-none">
                                </div>
                            </div>

                            <div class="flex gap-2">
                                <input type="password" name="password" id="profilePassword" placeholder="${i18n.t("profile.newPassword")}" class="w-full text-white placeholder:text-white text-left transition shadow-md shadow-blue-500/60 inset-shadow-sm inset-shadow-blue-900 rounded-xl text-xs px-3 py-2.5 focus:outline-none">
                                <input type="password" name="confirmPassword" id="profileConfirmPassword" placeholder="${i18n.t("profile.confirmPassword")}" class="w-full text-white placeholder:text-white text-left transition shadow-md shadow-blue-500/60 inset-shadow-sm inset-shadow-blue-900 rounded-xl text-xs px-3 py-2.5 focus:outline-none">
                            </div>
                        </div>
            
                        <input type="submit" value="${i18n.t("profile.update")}"  class="flex w-60 cursor-pointer self-center mt-3 text-white font-extrabold transition bg-gradient-to-r from-blue-300 via-blue-600 to-blue-300 shadow-md hover:shadow-lg shadow-blue-500/60 hover:shadow-blue-400/60 inset-shadow-sm inset-shadow-blue-900 rounded-xl text-sm px-3 py-1.5 text-center"
                            placeholder="${i18n.t("profile.update")}"
                        />
                    </form>

                </div>

            </div>
        </div>
    </div> 
  `
    }),
    __metadata("design:paramtypes", [])
], profilePopup);
export { profilePopup };
