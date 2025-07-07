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
let authCallback = class authCallback {
    constructor() {
        try {
            const url = new URL(window.location.href);
            const token = url.searchParams.get("token");
            if (token) {
                window.location.href = "/";
            }
            else {
                throw new Error("Token non trouvé dans l'URL");
            }
        }
        catch (error) {
            console.error("Erreur dans authCallback :", error);
            alert("Erreur lors de l'authentification.");
            window.location.href = "/login";
        }
    }
};
authCallback = __decorate([
    PageComponent({
        template: () => `
    <main class="flex items-center justify-center h-screen">
      <h1 class="text-white text-xl">Authentification en cours...</h1>
    </main>
  `
    }),
    __metadata("design:paramtypes", [])
], authCallback);
export { authCallback };
