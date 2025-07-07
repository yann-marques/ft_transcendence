export class App {
    constructor() {
        this.rootElement = null;
        this.routes = [];
        this.currentRoute = null;
        this.templates = {};
        this.scripts = {};
    }
    ;
    static getInstance() {
        if (!App.instance) {
            this.instance = new App();
        }
        return App.instance;
    }
}
