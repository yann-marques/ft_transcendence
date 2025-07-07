import { navbar } from "../components/navBar.js";
import { PageComponent } from "../decorators/page.js";
import { i18n } from "../common/i18n.js";
import { footer } from "../components/footer.js";
import { friendsNav } from "../components/friendsBar.js";
import { popup } from "../components/popup.js";
import { toggleElt, logoutUser, updateStatus } from "../utils.js";

@PageComponent({
  template: () => /* html */ `
    
    ${popup.render({})}
    
    ${navbar.render({ title: i18n.t("home.title"), shadow: "" })}

    
    <main class="flex flex-col grow justify-center items-center">

        <div class="flex flex-row gap-5 flex-wrap justify-center">
            <div id="loginButton" class="flex items-center invisile hidden relative">
                <a data-router href="/login" class="w-50 max-[620px]:w-50 cursor-pointer text-white font-bold transition bg-gradient-to-r from-green-400 via-green-600 to-green-700 shadow-md hover:shadow-lg shadow-green-500/60 hover:shadow-green-400/60 inset-shadow-sm inset-shadow-green-900 rounded-xl text-sm px-3 py-20.5 text-center me-2">
                ${i18n.t("home.login")}
                </a>
            </div>

            <div id="registrationButton" class="flex items-center flex invisile hidden relative gap-5">
                <a data-router="/register" class="w-50 max-[620px]:w-50 cursor-pointer text-white font-bold transition bg-gradient-to-r from-purple-400 via-purple-600 to-purple-700 shadow-md hover:shadow-lg shadow-purple-500/60 hover:shadow-purple-400/60 inset-shadow-sm inset-shadow-purple-900 rounded-xl text-sm px-3 py-20.5 text-center me-2">
                ${i18n.t("login.registerLink")}
                </a>
            </div>

            <div id="playButton" class="flex invisile hidden relative">
                <a data-router href="/play" class="flex justify-center w-50 max-[620px]:w-50 cursor-pointer self-center text-white font-bold transition bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 shadow-md hover:shadow-lg shadow-blue-500/60 hover:shadow-blue-400/60 inset-shadow-sm inset-shadow-blue-900 rounded-xl text-sm px-3 py-20.5 text-center me-2">
                ${i18n.t("home.play")}
                </a>
            </div>
            
            <div id="logoutButton" class="flex invisile hidden relative">
                <button id="logoutByButton" class="flex justify-center w-50 max-[620px]:w-50 cursor-pointer self-center text-white font-bold transition bg-gradient-to-r from-red-400 via-red-600 to-red-700 shadow-md hover:shadow-lg shadow-red-500/60 hover:shadow-red-400/60 inset-shadow-sm inset-shadow-red-900 rounded-xl text-sm px-3 py-20.5 text-center me-2">
                ${i18n.t("navbar.logout")}
                </button>
            </div>
        </div>

    </main>


    ${friendsNav.render()}
    
    ${footer.render()} 


  `
})
export class home {
    constructor() {

        new navbar();
        new popup();
        new friendsNav();

        (async () => {
            
            await updateStatus();
            const dataMe = JSON.parse(localStorage.getItem('me'));
            if (!dataMe){
                toggleElt('loginButton');
                toggleElt('registrationButton');
                return;
            }
            toggleElt('logoutButton');
            toggleElt('playButton');
    
            const logout = document.getElementById('logoutByButton');
            logout.addEventListener('click', () => {
                logoutUser('me');
            });

        })()
        
    }
}