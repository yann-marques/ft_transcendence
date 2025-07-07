import { App } from "./app.js";
import { isLogin } from "../utils.js";
let previousPath;
export class RouterHandler {
    initialize() {
        window.addEventListener('popstate', (e) => {
            if (previousPath && previousPath.includes('/pong')) {
                e.preventDefault();
                return;
            }
            this.changeData(window.location.pathname, false);
        });
    }
    routeHandler(event) {
        event.preventDefault();
        let eventTag = event.target.tagName.toLowerCase();
        let href = event.target.getAttribute("data-router");
        if (eventTag == "a" && !href) {
            href = event.target.href;
        }
        if (href != null) {
            this.changeData(href);
        }
    }
    async changeData(href, shouldPush = true) {
        let global = App.getInstance();
        if (href.includes('/pong')) {
            const ingame = localStorage.getItem('ingame');
            if (ingame && ingame == 'false') {
                return this.changeData('/', true);
            }
        }
        localStorage.setItem('ingame', 'false');
        previousPath = href;
        if (shouldPush) {
            history.pushState({}, 'newUrl', href);
        }
        let route = global.routes.find(route => route.path.replace(/^,/, '') == window.location.pathname.replace(/^,/, ''));
        if (route) {
            if (route.protected && !(await isLogin()))
                return;
            let routeComponent = route.pageComponent;
            if (!routeComponent)
                return;
            let componentName = routeComponent.name;
            if (componentName.includes('pong'))
                console.log('Pong instancie');
            if (global.rootElement != null) {
                global.currentRoute = {
                    path: route.path,
                    pageComponent: route.pageComponent,
                    protected: route.protected,
                    template: global.templates[componentName],
                    eventListeners: [],
                    props: []
                };
                if (typeof global.currentRoute.template == 'function')
                    global.rootElement.innerHTML = global.currentRoute.template();
                else
                    global.rootElement.innerHTML = global.currentRoute.template;
                new routeComponent();
                this.changeAnchorListeners();
            }
        }
    }
    changeAnchorListeners() {
        let routerElms = document.querySelectorAll("[data-router]");
        routerElms.forEach((elm) => {
            elm.addEventListener("click", (e) => {
                this.routeHandler(e);
                const pageData = elm.getAttribute("data-page");
                if (!pageData)
                    return;
                const data = JSON.parse(pageData);
                Object.keys(data).forEach(key => {
                    // Use the key from the data object to store the value in localStorage
                    localStorage.setItem(key, data[key]);
                });
            });
        });
    }
}
