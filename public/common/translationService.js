// Classe responsable de la gestion des traductions multilingues
export class TranslationService {
    constructor() {
        this.currentLang = "";
        this.translations = {};
        this._resolveReady = () => { };
        const user = JSON.parse(localStorage.getItem("me") || "null");
        if (user?.preferredLanguage)
            this.currentLang = user.preferredLanguage;
        else if (localStorage.getItem("lang"))
            this.currentLang = localStorage.getItem("lang");
        else
            this.currentLang = navigator.language.slice(0, 2).toLowerCase();
        if (!['en', 'fr', 'sp'].includes(this.currentLang))
            this.currentLang = "en";
        this._ready = new Promise((resolve) => {
            this._resolveReady = resolve;
        });
        this.loadTranslations(this.currentLang);
    }
    async init() {
        await this.loadTranslations(this.currentLang);
    }
    async loadTranslations(lang) {
        const response = await fetch(`/locales/${lang}.json`);
        this.translations = await response.json();
        this._resolveReady();
    }
    getTranslation(key) {
        const keys = key.split(".");
        let result = this.translations;
        for (const k of keys) {
            if (result && typeof result === "object" && k in result)
                result = result[k];
            else
                return "[Missing translation]";
        }
        return typeof result === "string" ? result : "[Invalid translation]";
    }
    async setLanguage(lang) {
        this.currentLang = lang;
        await this.loadTranslations(lang);
    }
    t(key) {
        return this.getTranslation(key);
    }
    get language() {
        return this.currentLang;
    }
    async ready() {
        return this._ready;
    }
}
