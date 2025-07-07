var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { PageComponent } from "../decorators/page.js";
// Écouteur d’événements global pour gérer les menus déroulants
document.addEventListener("click", (event) => {
    // Menu de gauche
    const buttonLeft = document.getElementById("avatarButton");
    const menuLeft = document.getElementById("dropdownAvatar");
    if (buttonLeft && buttonLeft.contains(event.target))
        menuLeft?.classList.toggle("hidden");
    else
        menuLeft?.classList.add("hidden");
    // Menu de langue
    const buttonLang = document.getElementById("languageButton");
    const menuLang = document.getElementById("dropdownLang");
    if (buttonLang && buttonLang.contains(event.target))
        menuLang?.classList.toggle("hidden");
    else
        menuLang?.classList.add("hidden");
});
const html = String.raw;
let menuPlay = class menuPlay {
};
menuPlay = __decorate([
    PageComponent({
        template: html `
        
        <div class="flex py-4 items-center justify-center">
            <nav class="flex w-150 px-4 border border-zinc-800 items-center justify-between rounded-xl h-15 bg-black text-white shadow-lg shadow-blue-500/50">
                <div>
                    <img class="w-9 h-9" src="https://42.fr/wp-content/uploads/2021/05/42-Final-sigle-seul.svg" />
                </div>
                
                <div class="flex">
                    <h1 class="text-lg transition-all font-extrabold bg-gradient-to-r from-blue-500 via-blue-200 to-fuchsia-100 bg-clip-text text-transparent">Pong game !</h1>
                </div>

                <div class="flex items-center gap-3">
                    
                    <div class="flex relative">
                        <button id="languageButton" class="flex text-center items-center p-0.5 px-1.5 bg-[conic-gradient(at_top,_#b5b5b5,_#232323,_#4d4d4d)] rounded">FR</button>
                        <ul id="dropdownLang" class="absolute text-center w-[130px] left-[-50px] top-[38px] rounded backdrop-blur shadow-lg shadow-white/50 hidden">
                            <li><a href="#" class="block px-4 py-1 text-sm text-white hover:underline">English</a></li>
                            <li><a href="#" class="block px-4 py-1 text-sm text-white hover:underline">French</a></li>
                            <li><a href="#" class="block px-4 py-1 text-sm text-white hover:underline">Spanish</a></li>
                        </ul>
                    </div>
    
                    <div class="flex relative">
                        <button id="avatarButton" class="flex">
                            <img class="h-[35px] w-[35px] rounded-full" src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"/>
                        </button>
                        <ul id="dropdownAvatar" class="absolute text-center w-[130px] left-[-50px] top-[38px] rounded backdrop-blur shadow-lg shadow-white/50 hidden">
                            <li><a href="#" class="block px-4 py-1 text-sm text-white hover:underline">Profil</a></li>
                            <li><a href="#" class="block px-4 py-1 text-sm text-white hover:underline">Stats</a></li>
                            <li><a href="#" class="block px-4 py-1 text-sm text-white hover:underline">Logout</a></li>
                        </ul>
                    <div>
                </div>
            </nav>
        </div>

        <main class="flex flex-col grow justify-between items-center">

            <div class="flex grow items-center">

                <div class="flex flex-col justify-around w-[900px] h-[400px] rounded-lg items-center bg-[conic-gradient(at_top,_#232323,_#101010,_#4d4d4d)] border border-blue-500/50 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.3),_10px_10px_30px_4px_rgba(45,78,255,0.30)]">
                    <div class="flex w-full h-[30px] justify-center">
                        <div class="flex">
                            <h1 class="text-xl transition-all hover:text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-blue-500 to-teal-500 text-transparent bg-clip-text">Choose your gamemode</h1>
                        </div>
                    </div>
                    <div class="flex flex-col gap-5">
                        <a data-router href="/lobby" class="w-90 text-white font-extrabold transition-all bg-gradient-to-r from-green-400 via-green-600 to-green-700 shadow-md hover:shadow-lg shadow-green-500/60 hover:shadow-green-400/60 inset-shadow-sm inset-shadow-green-900 rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2">1 VS 1</a>
                        <button type="button" class="w-90 text-white font-extrabold transition-all bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 shadow-md hover:shadow-lg shadow-blue-500/60 hover:shadow-blue-400/60 inset-shadow-sm inset-shadow-blue-900 rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2">1 VS AI</button>
                        <button type="button" class="w-90 text-white font-extrabold transition-all bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-700 shadow-md hover:shadow-lg shadow-yellow-500/60 hover:shadow-yellow-400/60 inset-shadow-sm inset-shadow-yellow-900 rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2">Tournament</button>
                    </div>
                </div>

            </div>
            
            <div class="flex w-full py-2 justify-center bg-black shadow-[_0_20px_50px_rgba(204,_204,_204,_1)]">
                <div class="flex">
                    <h1 class="text-white text-sm">2025 @ <span class="font-extrabold bg-gradient-to-r from-orange-500 via-blue-500 to-teal-500 text-transparent bg-clip-text">ft_transcendence</span> made with love by tebandam, ppuivif, gmersch, mbirou, ymarques. All rights reserved</h1>
                </div>
            </div>
            
        </main>

`
    })
], menuPlay);
export { menuPlay };
;
