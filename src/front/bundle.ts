import { i18n } from "./common/i18n.js";
import { MainConfig } from './decorators/config.js';
import { AppRoutes } from "./routes.js"
import { pong } from './pages/pong.js';

await i18n.init();

@MainConfig({
    rootElement: 'app',
    routes: AppRoutes
})
class Main{}
