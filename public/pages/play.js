var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { footer } from "../components/footer.js";
import { navbar } from "../components/navBar.js";
import { popup } from "../components/popup.js";
import { PageComponent } from "../decorators/page.js";
import { i18n } from "../common/i18n.js";
import { friendsNav } from "../components/friendsBar.js";
let play = class play {
    constructor() {
        new popup();
        new navbar();
        new footer();
        new friendsNav();
    }
};
play = __decorate([
    PageComponent({
        template: () => /* html */ `

    ${popup.render({})}
    ${navbar.render({
            shadow: 'shadow-lg shadow-blue-500/50',
            title: `${i18n.t("play.title")}`
        })}

    <main class="flex flex-col grow justify-between items-center">
      <div class="flex grow items-center">
        <div class="flex flex-col justify-around w-[900px] max-[925px]:w-[360px] h-[400px] rounded-2xl items-center backdrop-blur border border-blue-500/50 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.3),_10px_10px_30px_4px_rgba(45,78,255,0.30)]">
          
          <div class="flex w-full h-[30px] justify-center">
            <div class="flex">
              <h1 class="text-xl transition-all hover:text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-blue-500 to-teal-500 text-transparent bg-clip-text">
                ${i18n.t("play.title")}
              </h1>
            </div>
          </div>

          <div class="flex flex-col gap-5">
            <button data-router="/lobby" data-page='{"lobby": "1v1"}' class="w-90 max-[925px]:w-65 cursor-pointer text-white font-extrabold transition-all bg-gradient-to-r from-green-400 via-green-600 to-green-700 shadow-md hover:shadow-lg shadow-green-500/60 hover:shadow-green-400/60 inset-shadow-sm inset-shadow-green-900 rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2">
              ${i18n.t("play.1v1")}
            </button>
            <button data-router="/lobby" data-page='{"lobby": "1vIA"}' class="w-90 max-[925px]:w-65 cursor-pointer text-white font-extrabold transition-all bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 shadow-md hover:shadow-lg shadow-blue-500/60 hover:shadow-blue-400/60 inset-shadow-sm inset-shadow-blue-900 rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2">
              ${i18n.t("play.1vIA")}
            </button>
            <button data-router="/lobby" data-page='{"lobby": "tournament"}' class="w-90 max-[925px]:w-65 cursor-pointer text-white font-extrabold transition-all bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-700 shadow-md hover:shadow-lg shadow-yellow-500/60 hover:shadow-yellow-400/60 inset-shadow-sm inset-shadow-yellow-900 rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2">
              ${i18n.t("play.tournament")}
            </button>
          </div>

        </div>
      </div>
    </main>

    ${friendsNav.render({ username: 'wyblaze' })}

    ${footer.render()}
  `
    }),
    __metadata("design:paramtypes", [])
], play);
export { play };
