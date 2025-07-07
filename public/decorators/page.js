import { App } from "../common/app.js";
export function PageComponent(config) {
    const global = App.getInstance();
    return function (target) {
        const componentName = target.name;
        global.templates[componentName] =
            typeof config.template === "function"
                ? config.template
                : () => config.template;
    };
}
