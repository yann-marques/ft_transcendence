import { MainConfig } from "../interfaces/config.js";
import { App } from "../common/app.js";
import { RouterHandler } from "../common/routeHandler.js";

export function MainConfig(config: MainConfig) {
  let global = App.getInstance();
  global.routes = config.routes;
  global.rootElement = document.getElementById(config.rootElement);

  return function(target: any) {
    let router = new RouterHandler();
    router.initialize();
    router.changeData(window.location.pathname);
  }
}