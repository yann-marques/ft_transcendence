import { ComponentOptions } from "../interfaces/component";

const componentRegistry = new Map<string, ComponentOptions>();

export function Component(options: ComponentOptions): ClassDecorator {
  return function(target: any) {
    // options.template now is a function that receives props and returns string
    target.render = (props?: any) => {
      if (typeof options.template === 'function') {
        return options.template(props);
      }
      // fallback if template is string
      return options.template;
    };
    componentRegistry.set(target.name, options);
  };
}