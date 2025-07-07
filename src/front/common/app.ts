import { CurrentPath, Route } from "../interfaces/route.js";

export class App {
    private static instance: App;
    private constructor() {};

    static getInstance() {
        if (!App.instance) {
            this.instance = new App();
        }
        return App.instance;
    }

    rootElement: HTMLElement | null = null;
    routes: Route[] = [];
    currentRoute: CurrentPath | null = null;
    templates: any = {};
    scripts: any = {};
}