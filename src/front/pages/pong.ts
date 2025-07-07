import { PageComponent } from "../decorators/page.js";

import { game } from "../pong/game.js";

declare const BABYLON: any;

@PageComponent({
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
})
export class pong {
  private Game: game;

  constructor() {
    this.Game = new game();
  }
}
