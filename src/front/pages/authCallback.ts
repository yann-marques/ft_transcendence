import { PageComponent } from "../decorators/page.js";

@PageComponent({
  template: () => `
    <main class="flex items-center justify-center h-screen">
      <h1 class="text-white text-xl">Authentification en cours...</h1>
    </main>
  `
})
export class authCallback {
  constructor() {
    try {
      const url = new URL(window.location.href);
      const token = url.searchParams.get("token");

      if (token) {
        window.location.href = "/";
      } else {
        throw new Error("Token non trouvé dans l'URL");
      }
    } catch (error) {
      console.error("Erreur dans authCallback :", error);
      alert("Erreur lors de l'authentification.");
      window.location.href = "/login";
    }
  }
}
