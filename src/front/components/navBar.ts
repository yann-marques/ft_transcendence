import { Component } from "../decorators/component.js";
import { getStats, logoutUser, setPopupContent, toggleElt, updateStatus } from "../utils.js";
import { profilePopup } from "./profilePopup.js";
import { i18n } from "../common/i18n.js";
import { RouterHandler } from "../common/routeHandler.js";
import { statsPopup } from "./statsPopup.js";


@Component({
  template: (props) =>  /* html */ `
    <div class="flex py-4 items-center justify-center z-100">
        <nav class="flex w-150 max-[620px]:w-90 px-4 border border-zinc-800 items-center justify-between rounded-xl h-15 backdrop-blur text-white ${props.shadow}">
            <div>
                <img data-router="/" class="w-9 h-9 cursor-pointer" src="https://42.fr/wp-content/uploads/2021/05/42-Final-sigle-seul.svg" />
            </div>

            <div class="flex">
                <h1 class="text-lg transition-all text-center font-extrabold bg-gradient-to-r from-gray-500 via-gray-200 to-fuchsia-100 bg-clip-text text-transparent">
                    ${props.title}
                </h1>
            </div>

            <div class="flex items-center gap-3">
                <div class="flex relative">
                    <button id="languageButton" class="flex cursor-pointer text-center items-center p-0.5 px-1.5 bg-[conic-gradient(at_top,_#b5b5b5,_#232323,_#4d4d4d)] rounded">
                        ${localStorage.getItem("lang")?.toUpperCase() ?? "EN"}
                    </button>
                    <ul id="dropdownLang" class="absolute text-center w-[130px] left-[-50px] top-[38px] rounded backdrop-blur bg-[#00000099] shadow-lg shadow-white/50 hidden">
                        <li><a href="#" data-lang="en" class="block px-4 py-1 text-sm text-white hover:underline">${i18n.t("navbar.lang.en")}</a></li>
                        <li><a href="#" data-lang="fr" class="block px-4 py-1 text-sm text-white hover:underline">${i18n.t("navbar.lang.fr")}</a></li>
                        <li><a href="#" data-lang="sp" class="block px-4 py-1 text-sm text-white hover:underline">${i18n.t("navbar.lang.sp")}</a></li>
                    </ul>
                </div>

                <div id="avatarSection" class="flex invisile hidden relative">
                    <button id="avatarButton" class="flex cursor-pointer">
                        <img class="h-[35px] w-[35px] rounded-full" id="avatarNavbar" src=""/>
                    </button>
                    <ul id="dropdownAvatar" class="absolute text-center w-[130px] left-[-50px] top-[38px] rounded backdrop-blur bg-[#00000099] shadow-lg shadow-white/50 hidden">
                        <li class="cursor-pointer"><button id="profile" class="cursor-pointer px-4 py-1 text-sm text-white hover:underline">${i18n.t("navbar.profileButton")}</button></li>
                        <li class="cursor-pointer"><button id="stats" class="cursor-pointer px-4 py-1 text-sm text-white hover:underline">${i18n.t("navbar.stats")}</button></li>
                        <li class="cursor-pointer"><button id="logout" class="cursor-pointer px-4 py-1 text-sm text-white hover:underline">${i18n.t("navbar.logout")}</button></li>
                    </ul>
                <div> 
            
            </div>
        </nav>
    </div>
  `
})
export class navbar {
    static render: any;

    constructor() {

        (async () => {
            try {
                const buttonLang = document.getElementById("languageButton");
                const menuLang = document.getElementById("dropdownLang");
    
                let menuLeft;
                
                if (buttonLang) {
                    buttonLang.addEventListener("click", () => {
                        if (menuLeft && window.getComputedStyle(menuLeft).display != 'none')
                            menuLeft?.classList.toggle("hidden");
                        menuLang?.classList.toggle("hidden");
                    });
                }
    
                 // Sélection de langue
                document.querySelectorAll("#dropdownLang [data-lang]")?.forEach((el) => {
                    el.addEventListener("click", async (e) => {
                        e.preventDefault();
                        const lang = (e.target as HTMLElement).getAttribute("data-lang");
                        if (lang) {
                            await i18n.setLanguage(lang);
                            localStorage.setItem("lang", lang);
                            await fetch("/api/user/language", 
                            {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ lang })
                            });
    
                            const routeHandler = new RouterHandler;
                            routeHandler.changeData(window.location.href)
                        }
                    });
                });
    
                await updateStatus();
                const dataMe = JSON.parse(localStorage.getItem('me'));
                if (!dataMe) return;
    
                toggleElt('avatarSection');
                const avatarNavbar = document.getElementById('avatarNavbar') as HTMLImageElement;
                if (avatarNavbar)
                    avatarNavbar.src = dataMe['avatar']; 
    
                const buttonLeft = document.getElementById("avatarButton");
                menuLeft = document.getElementById("dropdownAvatar");
        
                //Buttons
                const logout = document.getElementById('logout');
                logout.addEventListener('click', () => {
                    logoutUser('me');
                });
        
                const profile = document.getElementById("profile");
                profile.addEventListener('click', () => {
                    menuLeft?.classList.toggle("hidden");
                    
                    const username = dataMe['username'];
                    const profilePopupComponent = profilePopup.render({username: username});
                    
                    setPopupContent(profilePopupComponent);
                    new profilePopup;
                    toggleElt('popup');
                });
    
                const stats = document.getElementById("stats");
                stats.addEventListener('click', async () => {
                    menuLeft?.classList.toggle("hidden");
                    
                    const username = dataMe['username'];
                    const statsPopupComponent = statsPopup.render({username: username});
                    
                    setPopupContent(statsPopupComponent);
                    
                    const stats = await getStats(username);
                    new statsPopup(stats);
                    toggleElt('popup');
                });
        
                if (buttonLeft) {
                    buttonLeft.addEventListener("click", () => {
                        if (window.getComputedStyle(menuLang).display != 'none')
                            menuLang?.classList.toggle("hidden");
                        menuLeft?.classList.toggle("hidden");
                    });
                }
        
            } catch (err) {
                console.log('Error: ', err);
            }
        })();
    }
}