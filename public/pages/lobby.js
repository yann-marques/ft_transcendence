var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PageComponent } from "../decorators/page.js";
import { popup } from "../components/popup.js";
import { navbar } from "../components/navBar.js";
import { footer } from "../components/footer.js";
import { loginPopup } from "../components/loginPopup.js";
import { toggleElt, updateAuthUserOnLobby } from "../utils.js";
import { i18n } from "../common/i18n.js";
import { friendsNav } from "../components/friendsBar.js";
import { RouterHandler } from "../common/routeHandler.js";
let lobby = class lobby {
    constructor() {
        new popup();
        new navbar();
        new footer();
        new friendsNav();
        updateAuthUserOnLobby();
        const popupEl = document.getElementById("popup");
        const popupContent = document.getElementById("popupContent");
        const buttonAddPlayer = document.getElementById("addPlayer");
        buttonAddPlayer.addEventListener('click', () => {
            const loginContent = loginPopup.render();
            popupContent.innerHTML = loginContent;
            toggleElt('popup');
            new loginPopup();
        });
        const buttonPlay = document.getElementById("playPong");
        function clickPLay(e) {
            e.preventDefault();
            localStorage.setItem('ingame', 'true');
            const router = new RouterHandler();
            router.changeData('/pong');
        }
        if (buttonPlay) {
            buttonPlay.removeEventListener('click', clickPLay);
            buttonPlay.addEventListener('click', clickPLay, { once: true });
        }
    }
};
lobby = __decorate([
    PageComponent({
        template: () => /* html */ `

    ${popup.render()}
    
    ${navbar.render({
            shadow: 'shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.3),_10px_10px_30px_4px_rgba(255,161,45,0.30)]',
            title: `${i18n.t("lobby.title")}`
        })} 

    <main class="flex flex-col grow justify-between items-center">

      <div class="flex flex-col justify-center grow items-center gap-10">

        <div class="flex gap-10 max-[875px]:flex-col">
          <div class="flex flex-col justify-around max-[875px]:w-[350px] w-[500px] max-[875px]:h-[175px] h-[500px] rounded-2xl items-center backdrop-blur border border-orange-400/50 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.3),_10px_10px_30px_4px_rgba(255,161,45,0.30)]">

            <div id="lobbyPlayerList" class="flex flex-col px-4 max-[875px]:h-[115px] h-[300px] gap-2 overflow-hidden overflow-y-auto"></div>

              <div class="flex justify-center items-center gap-4">
                  <button id="addPlayer" class="text-white text-sm cursor-pointer px-3 py-1 max-[875px]:py-0.5 max-[875px]:px-1  transition-all border border-orange-400/50 shadow-lg shadow-orange-400/50 bg-orange-400/50 rounded hover:shadow-orange-300/50">
                    ${i18n.t("lobby.addPlayer")} <span class="font-extrabold">+</span>
                  </button>
                  <button id="playPong" class="text-white text-sm cursor-pointer px-3 py-1 max-[875px]:py-0.5 max-[875px]:px-1 transition-all border border-green-500 shadow-lg shadow-green-500/50 bg-green-500/50 rounded hover:shadow-green-300/50">
                    ${i18n.t("lobby.playPong")}
                  </button>
              </div>

            </div>
            
            <div class="flex flex-col min-w-[250px] max-[875px]:h-[100px] max-[875px]:w-[350px] h-[500px] rounded-2xl items-center backdrop-blur border border-orange-400/50 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.3),_10px_10px_30px_4px_rgba(255,161,45,0.30)]">
              <div class="flex flex-col">
                <h1 class="absolute top-[13px] left-1/2 -translate-x-1/2 text-xs transition-all font-extrabold bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 bg-clip-text text-transparent">${i18n.t('lobby.matchOrder')}</h1> 
              </div>    
            
              <div id="lobbyMatchOrder" class="flex max-[875px]:mt-[18px] mt-[27px] flex-col p-4 h-[300px] gap-2 overflow-hidden overflow-y-auto"></div>
            </div>

          </div>

        </div>

      </div>
    </main>

    ${friendsNav.render({})}
    
    ${footer.render()} 
  `
    }),
    __metadata("design:paramtypes", [])
], lobby);
export { lobby };
