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
import { footer } from "../components/footer.js";
import { navbar } from "../components/navBar.js";
import { PageComponent } from "../decorators/page.js";
import { i18n } from "../common/i18n.js";
import { setPopupContent, toggleElt, toggleErrorText, updateStatus } from "../utils.js";
import { popup } from "../components/popup.js";
import { verifTwofaContent } from "../components/verifTwofaContent.js";
let login = class login {
    constructor() {
        new popup();
        new navbar();
        new footer();
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
                localStorage.setItem("lang", data.user.preferredLanguage);
                await i18n.setLanguage(data.user.preferredLanguage);
                await updateStatus();
                if (data.need_2fa) {
                    const twofaContentElt = verifTwofaContent.render();
                    setPopupContent(twofaContentElt);
                    new verifTwofaContent({ redirect: '/' });
                    toggleElt('popup');
                }
                else {
                    const router = new RouterHandler();
                    router.changeData("/");
                }
            }
            catch (error) {
                console.error('Error:', error);
            }
        });
    }
};
login = __decorate([
    PageComponent({
        template: () => /* html */ `

    ${popup.render()}

	${navbar.render({
            shadow: "shadow-lg shadow-green-500/50",
            title: `${i18n.t("login.title")}`
        })}

    <main class="flex flex-col grow justify-center items-center">
      <div class="flex w-[900px] max-[925px]:w-[350px] h-[430px] rounded-lg justify-center items-center backdrop-blur border border-zinc-800 shadow-lg shadow-green-500/50">
      
        <div class="flex flex-col gap-5">

			<div class="flex flex-col my-3 items-center h-[50px]">
                <h1 class="relative text-xl font-extrabold bg-gradient-to-l from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent self-center mb-0">
                    ${i18n.t("login.title")}
                </h1>
                <h1 id="errorText" class="text-red-400 mt-5 invisible text-center"></h1>
			</div> 
			
			<form id="formLogin" class="flex flex-col gap-2.5 justify-center items-center">
                <input type="text" placeholder="${i18n.t("login.username")}" name="username" class="flex w-90 max-[925px]:w-65 text-black transition bg-gray-200 shadow-md shadow-green-500/60 inset-shadow-sm inset-shadow-green-900 rounded-xl text-xs px-3 py-2.5 me-2 mb-2 placeholder-gray-900 focus:outline-none">
                <input type="password" placeholder="${i18n.t("login.password")}" name="password" class="flex w-90 max-[925px]:w-65 text-black transition bg-gray-200 shadow-md shadow-green-500/60 inset-shadow-sm inset-shadow-green-900 rounded-xl text-xs px-3 py-2.5 me-2 mb-2 placeholder-gray-900 focus:outline-none">
                <input type="submit" value="${i18n.t("login.submit")}" class="flex w-40 max-[925px]:w-65 cursor-pointer self-center text-white font-bold transition bg-gradient-to-r from-green-400 via-green-600 to-green-700 shadow-md hover:shadow-lg shadow-green-500/60 hover:shadow-green-400/60 inset-shadow-sm inset-shadow-green-900 rounded-xl text-sm px-3 py-1.5 text-center me-2">
			</form>
			
		<a href="/api/auth/google" class="w-60 cursor-pointer self-center text-white font-bold transition bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 shadow-md hover:shadow-lg shadow-blue-500/60 hover:shadow-blue-400/60 inset-shadow-sm inset-shadow-blue-900 rounded-xl text-sm px-3 py-1.5 text-center me-2">
			${i18n.t("login.loginGoogle")}
		</a>


		<span class="self-center mt-[10px] text-sm text-center font-semibold bg-gradient-to-l from-purple-300 via-purple-500 to-purple-300 bg-clip-text text-transparent my-0.5">
		    ${i18n.t("login.noAccount")}
		</span>

		<a data-router="/register" class="w-40 cursor-pointer self-center text-white font-bold transition bg-gradient-to-r from-purple-400 via-purple-600 to-purple-700 shadow-md hover:shadow-lg shadow-purple-500/60 hover:shadow-purple-400/60 inset-shadow-sm inset-shadow-purple-900 rounded-xl text-sm px-3 py-1.5 text-center me-2">
		    ${i18n.t("login.registerLink")}
		</a>

		</div>
	</main>

	${footer.render()} 
	`
    }),
    __metadata("design:paramtypes", [])
], login);
export { login };
