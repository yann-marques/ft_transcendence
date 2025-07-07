import { ia } from "./ia.js";
import { meshHandler } from "./meshHandler.js";
import { miscHandler } from "./miscHandler.js";
import { powerupHandler } from "./powerupHandler.js";
import { RouterHandler } from "../common/routeHandler.js";
import { createGame } from "../utils.js";
var PDL_VELO_Y = 65;
export class game {
    stopBABYLON() {
        for (var i = 0; i < this.meshHandler.Intervals.length; ++i) {
            clearInterval(this.meshHandler.Intervals[i]);
        }
        for (var i = 0; i < this.powerupHandler.Intervals.length; ++i) {
            clearInterval(this.powerupHandler.Intervals[i]);
        }
        this.meshHandler.game_over = true;
        this.meshHandler.pause = true;
        this.meshHandler.deleteScene = true;
    }
    go_up() {
        this.meshHandler.Paddles.right.aggr.body.setLinearVelocity(new BABYLON.Vector3(0, PDL_VELO_Y, 0));
        this.meshHandler.Paddles.right.down = true;
    }
    go_down() {
        this.meshHandler.Paddles.right.aggr.body.setLinearVelocity(new BABYLON.Vector3(0, -PDL_VELO_Y, 0));
        this.meshHandler.Paddles.right.up = true;
    }
    stop_moving() {
        this.meshHandler.Paddles.right.aggr.body.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
    }
    get_ball_pos() {
        const pos = [];
        pos.push(this.meshHandler.Balls[0].mesh.position.x);
        pos.push(this.meshHandler.Balls[0].mesh.position.y);
        pos.push(this.meshHandler.Balls[0].mesh.position.z);
        return (pos);
    }
    get_ball_velocity() {
        var vector = new BABYLON.Vector3(0, 0, 0);
        this.meshHandler.Balls[0].aggr.body.getLinearVelocityToRef(vector);
        return (vector);
    }
    get_paddle_velo() {
        return (PDL_VELO_Y);
    }
    get_paddle_y() {
        return (this.meshHandler.Paddles.right.mesh.position.y);
    }
    get_paddle_x() {
        return (this.meshHandler.Paddles.right.mesh.position.x);
    }
    get_paddle_Y_l() {
        return (this.meshHandler.Paddles.left.mesh.position.y);
    }
    removeEvents() {
        if (this.is_p2_ia && this.Bob)
            this.Bob.stop();
        this.engine.stopRenderLoop(this.renderLoop);
        this.engine = null;
        window.removeEventListener('resize', this.resize);
        window.removeEventListener('keyDown', this.keyDown);
        window.removeEventListener('keyup', this.keyUp);
    }
    constructor() {
        this.engine = null;
        this.is_p2_ia = false;
        this.nbRenders = 0;
        this.loaded = false;
        this.started = false;
        this.renderLoop = () => {
            if (this.meshHandler.deleteScene) {
                this.meshHandler.sceneStopped = true;
                this.scene.dispose();
                this.engine.dispose();
                this.hk.dispose();
                const router = new RouterHandler;
                router.changeData('/lobby');
                this.removeEvents();
                return;
            }
            if (!this.meshHandler.pause) {
                this.miscHandler.leftLight.position.y = this.meshHandler.Paddles.left.mesh.position.y;
                this.miscHandler.rightLight.position.y = this.meshHandler.Paddles.right.mesh.position.y;
                if (this.meshHandler.scene) {
                    this.meshHandler.scene.render();
                    if (!this.started)
                        this.nbRenders++;
                }
            }
        };
        this.resize = () => {
            if (this.engine == null || (!this.loaded && (this.meshHandler.game_over || !this.started)))
                return;
            this.engine.resize();
            this.miscHandler.fullscreen = (window.innerHeight == screen.height);
            if (this.miscHandler.fullscreen && window.innerWidth == screen.width)
                this.miscHandler.camera.fov = 1.1;
            else if (window.innerWidth == screen.width)
                this.miscHandler.camera.fov = (this.engine.getRenderHeight() / this.engine.getRenderWidth());
            else
                this.miscHandler.camera.fov = (this.engine.getRenderWidth() / this.engine.getRenderHeight());
            if (this.miscHandler.fullscreen) {
                this.miscHandler.camera.position = new BABYLON.Vector3(0, -2.6, -62.4);
                this.miscHandler.camera.setTarget(new BABYLON.Vector3(0, -15.3, 136.4));
            }
            else {
                this.miscHandler.camera.position = new BABYLON.Vector3(0, 3.5, -131.5);
                this.miscHandler.camera.setTarget(new BABYLON.Vector3(0, -9.5, 67));
            }
        };
        this.keyDown = (event) => {
            if (this.engine == null || (!this.loaded && (this.meshHandler.game_over || !this.started)))
                return;
            // to restart the game and end game
            if (this.meshHandler.match_over == true && event.key == 'c') {
                this.meshHandler.match_over = false;
                this.meshHandler.newMatch();
            }
            //  Paddle left moovement
            if (event.key == 'w' && this.meshHandler.Paddles.left.up) {
                this.meshHandler.Paddles.left.aggr.body.setLinearVelocity(new BABYLON.Vector3(0, PDL_VELO_Y, 0));
                this.meshHandler.Paddles.left.down = true;
            }
            if (event.key == 's' && this.meshHandler.Paddles.left.down) {
                this.meshHandler.Paddles.left.aggr.body.setLinearVelocity(new BABYLON.Vector3(0, -PDL_VELO_Y, 0));
                this.meshHandler.Paddles.left.up = true;
            }
            //  Paddle right moovement
            if (this.is_p2_ia == false && event.key == '8' && this.meshHandler.Paddles.right.up)
                this.go_up();
            if (this.is_p2_ia == false && event.key == '5' && this.meshHandler.Paddles.right.down)
                this.go_down();
            if (event.key == ' ' && !this.meshHandler.ballLaunched && this.meshHandler.match_over == false) {
                if (Math.random() > 0.5)
                    this.meshHandler.Balls[0].aggr.body.setLinearVelocity(new BABYLON.Vector3(this.meshHandler.Balls[0].speed, 0, 0));
                else
                    this.meshHandler.Balls[0].aggr.body.setLinearVelocity(new BABYLON.Vector3(-this.meshHandler.Balls[0].speed, 0, 0));
                this.meshHandler.ballLaunched = true;
            }
            if (event.key == 'F11')
                this.miscHandler.fullscreen = !this.miscHandler.fullscreen;
        };
        this.keyUp = (event) => {
            if (this.engine == null || (!this.loaded && (this.meshHandler.game_over || !this.started)))
                return;
            if (event.key == 'w')
                this.meshHandler.Paddles.left.aggr.body.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
            if (event.key == 's')
                this.meshHandler.Paddles.left.aggr.body.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
            if (this.is_p2_ia == false && event.key == '8')
                this.meshHandler.Paddles.right.aggr.body.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
            if (this.is_p2_ia == false && event.key == '5')
                this.meshHandler.Paddles.right.aggr.body.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
        };
        (async () => {
            this.canvas = document.getElementById("renderCanvas");
            this.engine = new BABYLON.Engine(this.canvas, true);
            await this.initPhysics();
            this.scene = new BABYLON.Scene(this.engine);
            this.scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), this.hk);
            this.miscHandler = new miscHandler(this.engine, this.scene, this.canvas);
            this.meshHandler = new meshHandler(this.scene, this.engine, this.hk, this.miscHandler, this.removeEvents);
            this.miscHandler.addMeshHandler(this.meshHandler);
            this.miscHandler.initPlayers();
            this.powerupHandler = new powerupHandler(this.scene, JSON.parse(localStorage.getItem('customPlayer'))[0].powerup == 1);
            this.powerupHandler.addMeshHandler(this.meshHandler);
            this.meshHandler.addPowerupHandler(this.powerupHandler);
            this.miscHandler.createLight();
            this.miscHandler.createCamera();
            this.meshHandler.createWalls();
            this.meshHandler.createWindow();
            this.meshHandler.createBalls();
            this.meshHandler.ballBounces(this.meshHandler.Balls[0]);
            this.meshHandler.detectGoal(this.meshHandler.Balls[0]);
            this.meshHandler.createScoreTxt();
            this.meshHandler.createPaddles();
            this.meshHandler.Paddles.left.aggr = this.meshHandler.createPaddlesAggregate(this.meshHandler.Paddles.left);
            this.meshHandler.Paddles.right.aggr = this.meshHandler.createPaddlesAggregate(this.meshHandler.Paddles.right);
            this.meshHandler.createSkybox();
            this.miscHandler.createShadows();
            await this.meshHandler.createModels3D();
            this.powerupHandler.setupPowerups(this.meshHandler.Balls[0]);
            this.miscHandler.changePlayerLights();
            this.miscHandler.updatePlayers();
            createGame([this.meshHandler.name_p1, this.meshHandler.name_p2]);
            this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
            this.scene.onBeforeRenderObservable.add((scene) => {
                for (let i = 0; i < this.meshHandler.Balls.length; ++i) {
                    this.meshHandler.Balls[i].aggr.body.setLinearVelocity(this.meshHandler.Balls[i].aggr.body.getLinearVelocity().multiply(new BABYLON.Vector3(1, 1, 0)));
                    this.meshHandler.Balls[i].mesh.position.z = 0;
                }
            });
            this.loaded = true;
            const key_lobby = localStorage.getItem('lobby');
            if (key_lobby == "1vIA") {
                this.is_p2_ia = true;
                this.Bob = new ia(this, this.meshHandler);
            }
            this.engine.runRenderLoop(this.renderLoop);
            var startrenders = 0;
            var intervalId = setInterval(() => {
                if (!this.scene.isReady())
                    return;
                for (let tex of this.scene.textures) {
                    if (!tex.isReady())
                        return;
                }
                for (let mesh of this.scene.meshes) {
                    if (!mesh.isReady())
                        return;
                }
                if (startrenders == 0)
                    startrenders = this.nbRenders;
                if (this.nbRenders - startrenders >= 2) {
                    this.started = true;
                    clearInterval(intervalId);
                }
            }, 100);
        })();
        window.addEventListener("resize", this.resize);
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    async initPhysics() {
        globalThis.HK = await HavokPhysics();
        this.hk = new BABYLON.HavokPlugin(true, globalThis.HK);
        await BABYLON.InitializeCSG2Async();
    }
}
