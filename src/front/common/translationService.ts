// Classe responsable de la gestion des traductions multilingues
export class TranslationService 
{
	private currentLang: string = "";
	public translations: Record<string, any> = {};
	public _ready: Promise<void>;
	private _resolveReady: () => void = () => {};

	constructor()
	{
		const user = JSON.parse(localStorage.getItem("me") || "null");

		if (user?.preferredLanguage)
			this.currentLang = user.preferredLanguage;
		else if (localStorage.getItem("lang"))
			this.currentLang = localStorage.getItem("lang")!;
		else
			this.currentLang = navigator.language.slice(0, 2).toLowerCase();

		if (!['en', 'fr', 'sp'].includes(this.currentLang))
			this.currentLang = "en";

		this._ready = new Promise((resolve) => {
			this._resolveReady = resolve;
		});
		this.loadTranslations(this.currentLang);
	}


	public async init() 
	{
		await this.loadTranslations(this.currentLang);
	}

	private async loadTranslations(lang: string) 
	{
		const response = await fetch(`/locales/${lang}.json`);
		this.translations = await response.json();
		this._resolveReady();
	}

	private getTranslation(key: string): string 
	{
		const keys = key.split(".");
		let result: any = this.translations;
		for (const k of keys) 
		{
			if (result && typeof result === "object" && k in result)
				result = result[k];
			else
				return "[Missing translation]";
		}
		return typeof result === "string" ? result : "[Invalid translation]";
	}

	public async setLanguage(lang: string) 
	{
		this.currentLang = lang;
		await this.loadTranslations(lang);
	}

	public t(key: string): string 
	{
		return this.getTranslation(key);
	}

	public get language(): string 
	{
		return this.currentLang;
	}

	public async ready(): Promise<void> {
		return this._ready;
	}
}