const componentRegistry = new Map();
export function Component(options) {
    return function (target) {
        // options.template now is a function that receives props and returns string
        target.render = (props) => {
            if (typeof options.template === 'function') {
                return options.template(props);
            }
            // fallback if template is string
            return options.template;
        };
        componentRegistry.set(target.name, options);
    };
}
