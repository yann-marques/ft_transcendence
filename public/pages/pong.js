var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PageComponent } from "../decorators/page.js";
import { game } from "../pong/game.js";
let pong = class pong {
    constructor() {
        this.Game = new game();
    }
};
pong = __decorate([
    PageComponent({
        template: /* html */ `
    <head>
      <title>Pongy Ponga</title>
    </head>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
      canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
    </style>
    <body>
      <canvas id="renderCanvas"></canvas>
    </body>
  `
    }),
    __metadata("design:paramtypes", [])
], pong);
export { pong };
