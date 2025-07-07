import { Route } from "./interfaces/route.js"
import { play } from './pages/play.js';
import { lobby } from './pages/lobby.js'
import { pong } from './pages/pong.js'
import { login } from "./pages/login.js";
import { register } from "./pages/register.js";
import { home } from "./pages/home.js";

export const AppRoutes: Route[] = [
    {
        path: "/",
        pageComponent: home,
        protected: false
    },
    {
        path: "/play",
        pageComponent: play,
        protected: true
    },
    {
        path: "/lobby",
        pageComponent: lobby,
        protected: true
    },
    {
        path: "/pong",
        pageComponent: pong,
        protected: true
    },
    {
        path: "/login",
        pageComponent: login,
        protected: false
    },
    {
        path: "/register",
        pageComponent: register,
        protected: false
    }
]