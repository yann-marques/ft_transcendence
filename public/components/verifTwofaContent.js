var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { RouterHandler } from "../common/routeHandler.js";
import { Component } from "../decorators/component.js";
import { toggleElt, toggleErrorText, updateAuthUserOnLobby, updateStatus, verifyQRCode } from "../utils.js";
let verifTwofaContent = class verifTwofaContent {
    constructor(props) {
        function focusNextInput(el, prevId, nextId) {
            if (el.value.length === 0) {
                if (prevId) {
                    document.getElementById(prevId).focus();
                }
            }
            else {
                if (nextId) {
                    document.getElementById(nextId).focus();
                }
            }
        }
        document.querySelectorAll('[data-focus-input-init]').forEach(function (element) {
            element.addEventListener('keyup', function () {
                const prevId = this.getAttribute('data-focus-input-prev');
                const nextId = this.getAttribute('data-focus-input-next');
                focusNextInput(this, prevId, nextId);
            }, { once: true });
            // Handle paste event to split the pasted code into each input
            element.addEventListener('paste', function (event) {
                event.preventDefault();
                const pasteData = (event.clipboardData || window.clipboardData).getData('text');
                const digits = pasteData.replace(/\D/g, ''); // Only take numbers from the pasted data
                // Get all input fields
                const inputs = document.querySelectorAll('[data-focus-input-init]');
                // Iterate over the inputs and assign values from the pasted string
                inputs.forEach((input, index) => {
                    if (digits[index]) {
                        input.value = digits[index];
                        const nextId = input.getAttribute('data-focus-input-next');
                        if (nextId) {
                            document.getElementById(nextId).focus();
                        }
                    }
                });
            });
        });
        let code = "";
        const verifyCode = document.getElementById('verifyCode');
        verifyCode.addEventListener('click', async () => {
            console.log('event');
            const inputs = document.querySelectorAll('[data-focus-input-init]');
            inputs.forEach((input) => {
                code += input.value.trim();
            });
            if ((await verifyQRCode(code))) {
                await updateStatus();
                await updateAuthUserOnLobby();
                if (props.redirect) {
                    const router = new RouterHandler;
                    router.changeData(props.redirect);
                }
                if (props.closePopup)
                    toggleElt('popup');
            }
            else {
                code = "";
                inputs.forEach((input) => {
                    input.value = '';
                    toggleErrorText('errorTextQRCode', 'Mauvais code de validation');
                });
            }
        });
    }
};
verifTwofaContent = __decorate([
    Component({
        template: /* html */ `
    <div class="flex flex-col gap-5 w-full px-4">
        
        <div id="verif2faContent" class="flex flex-col w-full h-full items-center justify-center gap-8">
            <div class="flex flex-col justify-center items-center text-center gap-4">
                <img class="w-[150px] h-[150px]" id="QRCode" src="/static/icons/2fa.svg" />
                <h1 class="flex text-white">Veuillez saisir le code a 6 chiffes sur votre application d'authentification</h1>
                <h1 id="errorTextQRCode" class="text-red-400"></h1>
                <form class="max-w-sm mx-auto">
                    <div class="flex mb-2 space-x-2 rtl:space-x-reverse">
                        <div>
                            <label for="code-1" class="sr-only">First code</label>
                            <input type="text" maxlength="1" data-focus-input-init data-focus-input-next="code-2" id="code-1" class="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                        </div>
                        <div>
                            <label for="code-2" class="sr-only">Second code</label>
                            <input type="text" maxlength="1" data-focus-input-init data-focus-input-prev="code-1" data-focus-input-next="code-3" id="code-2" class="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                        </div>
                        <div>
                            <label for="code-3" class="sr-only">Third code</label>
                            <input type="text" maxlength="1" data-focus-input-init data-focus-input-prev="code-2" data-focus-input-next="code-4" id="code-3" class="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                        </div>
                        <div>
                            <label for="code-4" class="sr-only">Fourth code</label>
                            <input type="text" maxlength="1" data-focus-input-init data-focus-input-prev="code-3" data-focus-input-next="code-5" id="code-4" class="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                        </div>
                        <div>
                            <label for="code-5" class="sr-only">Fifth code</label>
                            <input type="text" maxlength="1" data-focus-input-init data-focus-input-prev="code-4" data-focus-input-next="code-6" id="code-5" class="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                        </div>
                        <div>
                            <label for="code-6" class="sr-only">Sixth code</label>
                            <input type="text" maxlength="1" data-focus-input-init data-focus-input-prev="code-5" id="code-6" class="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                        </div>
                    </div>
                </form>

                <button class="text-black cursor-pointer w-[80px] h-[30px] bg-white rounded-2xl border" id="verifyCode">
                    Valider
                </button>
            </div>
        </div>
        
    </div>
    `
    }),
    __metadata("design:paramtypes", [Object])
], verifTwofaContent);
export { verifTwofaContent };
