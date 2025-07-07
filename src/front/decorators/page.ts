import { App } from "../common/app.js";
import { PageConfig } from "../interfaces/pageConfig.js";

export function PageComponent(config: PageConfig) {
	const global = App.getInstance();
	return function (target: any) {
		const componentName = target.name;

		global.templates[componentName] =
			typeof config.template === "function"
				? config.template
				: () => config.template;
	};
}