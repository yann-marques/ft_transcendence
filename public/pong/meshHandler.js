import { createGame } from "../utils.js";
export class meshHandler {
    getWinnerName(winner) {
        if (winner == "p1")
            return (this.name_p1);
        return (this.name_p2);
    }
    createWalls() {
        this.Walls.up.mesh = BABYLON.MeshBuilder.CreateBox("upWall", { width: this.WIDTH + this.DEPTH, height: this.DEPTH - 0.01, depth: this.DEPTH - 0.1 }, this.scene);
        this.Walls.up.mesh.position.y = this.HEIGHT / 2;
        this.Walls.up.aggr = new BABYLON.PhysicsAggregate(this.Walls.up.mesh, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
        this.Walls.up.mesh.setEnabled(false);
        this.Walls.down.mesh = BABYLON.MeshBuilder.CreateBox("downWall", { width: this.WIDTH + this.DEPTH, height: this.DEPTH - 0.01, depth: this.DEPTH - 0.1 }, this.scene);
        this.Walls.down.mesh.position.y = -this.HEIGHT / 2;
        this.Walls.down.aggr = new BABYLON.PhysicsAggregate(this.Walls.down.mesh, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
        this.Walls.down.mesh.setEnabled(false);
        this.Walls.left.mesh = BABYLON.MeshBuilder.CreateBox("leftWall", { width: this.DEPTH - 0.01, height: this.HEIGHT - this.DEPTH, depth: this.DEPTH - 0.1 }, this.scene);
        this.Walls.left.mesh.position.x = -this.WIDTH / 2;
        this.Walls.left.aggr = new BABYLON.PhysicsAggregate(this.Walls.left.mesh, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
        this.Walls.left.mesh.setEnabled(false);
        this.Walls.right.mesh = BABYLON.MeshBuilder.CreateBox("rightWall", { width: this.DEPTH - 0.01, height: this.HEIGHT - this.DEPTH, depth: this.DEPTH - 0.1 }, this.scene);
        this.Walls.right.mesh.position.x = this.WIDTH / 2;
        this.Walls.right.aggr = new BABYLON.PhysicsAggregate(this.Walls.right.mesh, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
        this.Walls.right.mesh.setEnabled(false);
        this.Walls.floor.mesh = BABYLON.MeshBuilder.CreateBox("floor", { width: this.WIDTH * 2, height: this.DEPTH - 0.01, depth: this.DEPTH_FLOOR }, this.scene);
        this.Walls.floor.mesh.position.y = (-this.HEIGHT / 2) - 2;
        this.Walls.floor.mesh.position.z = -this.DEPTH_FLOOR / 2;
        let pbrMat = new BABYLON.PBRMaterial("pbrMat", this.scene);
        {
            pbrMat.albedoTexture = new BABYLON.Texture("/assets/armor/albedo.png", this.scene);
            pbrMat.ambientTexture = new BABYLON.Texture("/assets/armor/ao.png", this.scene);
            pbrMat.metallicTexture = new BABYLON.Texture("/assets/armor/metallic.png", this.scene);
            pbrMat.roughnessTexture = new BABYLON.Texture("/assets/armor/roughness.png", this.scene);
            pbrMat.bumpTexture = new BABYLON.Texture("/assets/armor/normal-dx.png", this.scene);
            pbrMat.useParallaxOcclusion = true;
            pbrMat.useParallax = true;
            pbrMat.metallic = 0.9;
            pbrMat.roughness = 0.1;
            pbrMat.parallaxScaleBias = 0.9;
            [pbrMat.bumpTexture, pbrMat.ambientTexture, pbrMat.roughnessTexture, pbrMat.albedoTexture, pbrMat.metallicTexture].forEach(tex => {
                if (tex) {
                    tex.uScale = 1;
                    tex.vScale = 3;
                }
            });
        }
        pbrMat.maxSimultaneousLights = 5;
        this.Walls.floor.mesh.material = pbrMat;
    }
    createScoreTxt() {
        this.score_mesh_l = BABYLON.MeshBuilder.CreatePlane("plane", { width: 9, height: 9 }, this.scene);
        var advancedTexture_l = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.score_mesh_l, 4096, 4096);
        this.txt_score_l = new BABYLON.GUI.TextBlock();
        this.txt_score_l.text = "0";
        this.txt_score_l.color = "white";
        this.txt_score_l.fontSize = 500;
        this.score_mesh_l.position = new BABYLON.Vector3(-57, 15, -3);
        advancedTexture_l.addControl(this.txt_score_l);
        this.score_mesh_l.scaling = new BABYLON.Vector3(5, 5, 1);
        this.score_mesh_r = BABYLON.MeshBuilder.CreatePlane("plane", { width: 9, height: 9 }, this.scene);
        var advancedTexture_r = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.score_mesh_r, 4096, 4096);
        this.txt_score_r = new BABYLON.GUI.TextBlock();
        this.txt_score_r.text = "0";
        this.txt_score_r.color = "white";
        this.txt_score_r.fontSize = 500;
        this.score_mesh_r.position = new BABYLON.Vector3(57, 15, -3);
        advancedTexture_r.addControl(this.txt_score_r);
        this.score_mesh_r.scaling = new BABYLON.Vector3(5, 5, 1);
        this.name_p1_mesh = BABYLON.MeshBuilder.CreatePlane("plane", { width: 9, height: 9 }, this.scene);
        var advancedTexture_p1 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.name_p1_mesh, 4096, 4096);
        this.txt_name_p1 = new BABYLON.GUI.TextBlock();
        this.txt_name_p1.text = this.name_p1.slice(0, 7);
        this.txt_name_p1.color = "white";
        this.txt_name_p1.fontSize = 300;
        this.name_p1_mesh.position = new BABYLON.Vector3(-57, 20, -3);
        advancedTexture_p1.addControl(this.txt_name_p1);
        this.name_p1_mesh.scaling = new BABYLON.Vector3(5, 5, 1);
        this.name_p2_mesh = BABYLON.MeshBuilder.CreatePlane("plane", { width: 9, height: 9 }, this.scene);
        var advancedTexture_p2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.name_p2_mesh, 4096, 4096);
        this.txt_name_p2 = new BABYLON.GUI.TextBlock();
        this.txt_name_p2.text = this.name_p2.slice(0, 7);
        this.txt_name_p2.color = "white";
        this.txt_name_p2.fontSize = 300;
        this.name_p2_mesh.position = new BABYLON.Vector3(57, 20, -3);
        advancedTexture_p2.addControl(this.txt_name_p2);
        this.name_p2_mesh.scaling = new BABYLON.Vector3(5, 5, 1);
    }
    newMatch() {
        if (this.game_over)
            return;
        this.winner_plane.dispose();
        this.resetAfterGoal();
        this.score_p1 = 0;
        this.score_p2 = 0;
        this.txt_score_l.text = "0";
        this.txt_score_r.text = "0";
        this.miscHandler.updatePlayers();
        this.miscHandler.changePlayerLights();
        createGame([this.name_p1, this.name_p2]);
        this.match_over = false;
    }
    endGame(winner) {
        this.miscHandler.updateNextPlayer(winner);
        this.match_over = true;
        this.winner_plane = BABYLON.MeshBuilder.CreatePlane("plane", { width: 10, height: 10 }, this.scene);
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.winner_plane, 4096, 4096);
        var winnerTxt = new BABYLON.GUI.TextBlock();
        winnerTxt.text = this.getWinnerName(winner) + " is the Winner !\n\nNext Match:\n" + this.next_p1.slice(0, 11) +
            " vs " + this.next_p2.slice(0, 11) + "\n\nPress 'c' to continue.";
        winnerTxt.color = "white";
        winnerTxt.fontSize = 350;
        this.winner_plane.position = new BABYLON.Vector3(0, 0, -3);
        advancedTexture.addControl(winnerTxt);
        this.winner_plane.scaling = new BABYLON.Vector3(5, 5, 1);
        this.miscHandler.addWinner(winner);
        if (this.miscHandler.players.length < 2) {
            if (this.miscHandler.winners.length > 1) {
                this.miscHandler.players = Object.assign([], this.miscHandler.winners);
                this.miscHandler.winners = [];
            }
            else {
                for (var i = 0; i < this.Intervals.length; ++i) {
                    clearInterval(this.Intervals[i]);
                }
                for (var i = 0; i < this.powerupHandler.Intervals.length; ++i) {
                    clearInterval(this.powerupHandler.Intervals[i]);
                }
                this.game_over = true;
                this.pause = true;
                this.deleteScene = true;
                return (true);
            }
        }
        return (false);
    }
    detectGoal(ball) {
        var right = false;
        ball.aggr.body.setCollisionCallbackEnabled(true);
        var ballCollisionObs = ball.aggr.body.getCollisionObservable();
        var goal = ballCollisionObs.add((collisionEvent) => {
            if (this.is_goal_scored == false) {
                if (collisionEvent.collider == this.Walls.right.aggr.body || collisionEvent.collidedAgainst == this.Walls.right.aggr.body) {
                    right = false;
                    this.score_p1++;
                    this.is_goal_scored = true;
                }
                else if (collisionEvent.collider == this.Walls.left.aggr.body || collisionEvent.collidedAgainst == this.Walls.left.aggr.body) {
                    right = true;
                    this.score_p2++;
                    this.is_goal_scored = true;
                }
                if (this.is_goal_scored) {
                    this.txt_score_l.text = this.score_p1;
                    this.txt_score_r.text = this.score_p2;
                    if (right)
                        this.miscHandler.shakeCamera(this.miscHandler.alarmLight_l);
                    else
                        this.miscHandler.shakeCamera(this.miscHandler.alarmLight_r);
                    if (this.score_p1 == 5) {
                        if (this.endGame("p1"))
                            return;
                    }
                    else if (this.score_p2 == 5) {
                        if (this.endGame("p2"))
                            return;
                    }
                    this.resetAfterGoal();
                    this.ballLaunched = false;
                }
            }
        });
    }
    createBalls() {
        this.Balls = [];
        let currentBall = { mesh: null, aggr: null, speed: this.startSpeed, lastTouched: null, bounces: 0 };
        currentBall.mesh = BABYLON.MeshBuilder.CreateSphere("ball", { diameter: this.DIAMETER, segments: this.SEGMENTS }, this.scene);
        currentBall.aggr = new BABYLON.PhysicsAggregate(currentBall.mesh, BABYLON.PhysicsShapeType.SPHERE, { mass: 100, friction: 0, restitution: 1.0 }, this.scene);
        let pbrMat = new BABYLON.PBRMaterial("pbrMat", this.scene);
        pbrMat.roughness = 0.25;
        this.miscHandler.spotLightOut.excludedMeshes.push(currentBall.mesh);
        currentBall.mesh.material = pbrMat;
        this.Balls.push(currentBall);
        return (currentBall);
    }
    createPaddles() {
        this.Paddles = { left: { mesh: null, aggr: null, up: true, down: true }, right: { mesh: null, aggr: null, up: true, down: true } };
        this.Paddles.left.mesh = BABYLON.MeshBuilder.CreateBox("leftPaddles", { width: this.WIDTH_PA, height: this.HEIGHT_PA, depth: this.DEPTH_PA }, this.scene);
        this.Paddles.left.mesh.position.x -= this.WIDTH / 2 - 3;
        this.Paddles.right.mesh = BABYLON.MeshBuilder.CreateBox("rigthPaddles", { width: this.WIDTH_PA, height: this.HEIGHT_PA, depth: this.DEPTH_PA }, this.scene);
        this.Paddles.right.mesh.position.x += this.WIDTH / 2 - 3;
        let pbrMat = new BABYLON.PBRMaterial("pbrMat", this.scene);
        {
            pbrMat.albedoTexture = new BABYLON.Texture("/assets/paddles/albedo.jpg", this.scene);
            pbrMat.ambientTexture = new BABYLON.Texture("/assets/paddles/ao.jpg", this.scene);
            pbrMat.metallicTexture = new BABYLON.Texture("/assets/paddles/metallic.jpg", this.scene);
            pbrMat.roughnessTexture = new BABYLON.Texture("/assets/paddles/roughness.jpg", this.scene);
            pbrMat.bumpTexture = new BABYLON.Texture("/assets/paddles/normal-dx.png", this.scene);
            pbrMat.useParallaxOcclusion = true;
            pbrMat.useParallax = true;
            pbrMat.metallic = 0;
            pbrMat.roughness = 0.1;
            pbrMat.parallaxScaleBias = 0.2;
            [pbrMat.bumpTexture, pbrMat.ambientTexture, pbrMat.roughnessTexture, pbrMat.albedoTexture, pbrMat.metallicTexture].forEach(tex => {
                if (tex) {
                    tex.uScale = 0.2;
                    tex.vScale = 14 * tex.uScale;
                }
            });
            pbrMat.alpha = 0.9;
        }
        this.Paddles.left.mesh.material = pbrMat;
        this.Paddles.right.mesh.material = pbrMat;
    }
    createWindow() {
        this.window = { mesh: null, aggr: null };
        this.window.mesh = BABYLON.MeshBuilder.CreateBox("window", { width: this.WIDTH - this.DEPTH, height: this.HEIGHT - this.DEPTH, depth: this.DEPTH }, this.scene);
        this.window.mesh.scaling = new BABYLON.Vector3(1, 0.9, 2);
        var CSG2windowHole = BABYLON.CSG2.FromMesh(this.window.mesh);
        this.window.mesh.scaling = new BABYLON.Vector3(0.95, 1, 2);
        var CSG2windowHole2 = BABYLON.CSG2.FromMesh(this.window.mesh);
        this.window.mesh.position.x += 6.75;
        this.window.mesh.position.y -= 5;
        this.window.mesh.scaling = new BABYLON.Vector3(3, 5, 1);
        var CSG2window = BABYLON.CSG2.FromMesh(this.window.mesh);
        CSG2window = CSG2window.subtract(CSG2windowHole);
        CSG2window = CSG2window.subtract(CSG2windowHole2);
        var corner = BABYLON.MeshBuilder.CreateCylinder("cone", { height: this.DEPTH + 1, diameter: 5, tessellation: 128 }, this.scene);
        corner.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2);
        corner.position.x = this.WIDTH / 2 - 3;
        corner.position.y = -this.HEIGHT / 2 + 3;
        corner.setEnabled(false);
        var CSG2corner = BABYLON.CSG2.FromMesh(corner);
        CSG2window = CSG2window.subtract(CSG2corner);
        CSG2corner.dispose();
        corner.position.x = -this.WIDTH / 2 + 3;
        corner.position.y = -this.HEIGHT / 2 + 3;
        var CSG2corner = BABYLON.CSG2.FromMesh(corner);
        CSG2window = CSG2window.subtract(CSG2corner);
        CSG2corner.dispose();
        corner.position.x = -this.WIDTH / 2 + 3;
        corner.position.y = this.HEIGHT / 2 - 3;
        var CSG2corner = BABYLON.CSG2.FromMesh(corner);
        CSG2window = CSG2window.subtract(CSG2corner);
        CSG2corner.dispose();
        corner.position.x = this.WIDTH / 2 - 3;
        corner.position.y = this.HEIGHT / 2 - 3;
        var CSG2corner = BABYLON.CSG2.FromMesh(corner);
        CSG2window = CSG2window.subtract(CSG2corner);
        CSG2corner.dispose();
        corner.dispose();
        CSG2windowHole.dispose();
        CSG2windowHole2.dispose();
        this.window.mesh.dispose();
        this.window.mesh = CSG2window.toMesh();
        CSG2window.dispose();
        let pbrMat = new BABYLON.PBRMaterial("pbrMat", this.scene);
        pbrMat.ambientTexture = new BABYLON.Texture("/assets/WindowPBR/Window-ambient.png", this.scene);
        pbrMat.albedoTexture = new BABYLON.Texture("/assets/WindowPBR/Window-albedo.png", this.scene);
        pbrMat.metallicTexture = new BABYLON.Texture("/assets/WindowPBR/Window-metallic.png", this.scene);
        pbrMat.roughnessTexture = new BABYLON.Texture("/assets/WindowPBR/Window-roughness.png", this.scene);
        pbrMat.bumpTexture = new BABYLON.Texture("/assets/WindowPBR/Window-normal.png", this.scene);
        pbrMat.useParallax = true;
        pbrMat.useParallaxOcclusion = true;
        pbrMat.metallic = 1.5;
        pbrMat.roughness = 0.1;
        pbrMat.parallaxScaleBias = 0.2;
        [pbrMat.albedoTexture, pbrMat.bumpTexture, pbrMat.metallicTexture, pbrMat.ambientTexture, pbrMat.roughnessTexture].forEach(tex => {
            if (tex) {
                tex.uScale = 10;
                tex.vScale = 6;
            }
        });
        this.window.mesh.material = pbrMat;
        this.window.mesh.position.x += 6.75;
        this.window.mesh.position.y -= 5;
        var centerPoint = BABYLON.MeshBuilder.CreateBox("centerPoint", { width: 0.1, height: 0.1, depth: 0.1 }, this.scene);
        centerPoint.setEnabled(false);
        this.window.aggr = new BABYLON.PhysicsAggregate(centerPoint, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
        this.window.aggr.shape.filterCollideMask = 0;
    }
    createPaddlesAggregate(paddle) {
        var paddleJoint = new BABYLON.Physics6DoFConstraint({
            pivotA: new BABYLON.Vector3(0, 0, 0),
            pivotB: new BABYLON.Vector3(paddle.mesh.position.x, 0, 0),
            perpaxisA: new BABYLON.Vector3(0, 1, 0),
            perpaxisB: BABYLON.Vector3(0, 1, 0),
            collision: true
        }, [
            {
                axis: BABYLON.PhysicsConstraintAxis.LINEAR_X,
                minLimit: 0,
                maxLimit: 0,
                stiffness: 10,
            },
            {
                axis: BABYLON.PhysicsConstraintAxis.LINEAR_Z,
                minLimit: 0,
                maxLimit: 0,
                stiffness: 100,
            },
            {
                axis: BABYLON.PhysicsConstraintAxis.ANGULAR_X,
                minLimit: 0,
                maxLimit: 0,
                stiffness: 1000,
            },
            {
                axis: BABYLON.PhysicsConstraintAxis.ANGULAR_Y,
                minLimit: 0,
                maxLimit: 0,
                stiffness: 1000,
            },
            {
                axis: BABYLON.PhysicsConstraintAxis.ANGULAR_Z,
                minLimit: 0,
                maxLimit: 0,
                stiffness: 1000,
            }
        ], this.scene);
        var aggr = new BABYLON.PhysicsAggregate(paddle.mesh, BABYLON.PhysicsShapeType.BOX, { mass: 1000, friction: 1, restitution: 0 }, this.scene);
        aggr.body.disablePreStep = false;
        aggr.body.addConstraint(this.window.aggr.body, paddleJoint);
        aggr.body.setCollisionCallbackEnabled(true);
        var plobservable = aggr.body.getCollisionObservable();
        var plobserver = plobservable.add((collisionEvent) => {
            paddle.up = true;
            paddle.down = true;
            for (let i = 0; i < this.Balls.length; ++i)
                if (collisionEvent.collider == this.Balls[i].aggr.body || collisionEvent.collidedAgainst == this.Balls[i].aggr.body)
                    return;
            aggr.body.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
            if (paddle.mesh.position.y > 0) {
                paddle.up = false;
                paddle.down = true;
                paddle.mesh.position.y -= 0.05;
            }
            else {
                paddle.up = true;
                paddle.down = false;
                paddle.mesh.position.y += 0.05;
            }
        });
        return (aggr);
    }
    ballBounces(ball) {
        var ballCollisionObs = ball.aggr.body.getCollisionObservable();
        var goal = ballCollisionObs.add((collisionEvent) => {
            if ((collisionEvent.collider == this.Paddles.left.aggr.body || collisionEvent.collidedAgainst == this.Paddles.left.aggr.body)
                && ball.mesh.position.x > this.Paddles.left.mesh.position.x) {
                if (ball.lastTouched != this.Paddles.left) {
                    var angle = (ball.mesh.position.y - this.Paddles.left.mesh.position.y) / ((this.HEIGHT_PA * this.Paddles.left.mesh.scaling.y) / 2) * (Math.PI * 0.25);
                    ball.speed += 0.25;
                    ball.aggr.body.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
                    ball.aggr.body.setLinearVelocity(new BABYLON.Vector3(Math.cos(angle), Math.sin(angle), 0).normalize().multiply(new BABYLON.Vector3(ball.speed, ball.speed, 0)), ball.mesh.position);
                    ball.bounces += 1;
                }
                ball.lastTouched = this.Paddles.left;
            }
            if ((collisionEvent.collider == this.Paddles.right.aggr.body || collisionEvent.collidedAgainst == this.Paddles.right.aggr.body)
                && ball.mesh.position.x < this.Paddles.right.mesh.position.x) {
                if (ball.lastTouched != this.Paddles.right) {
                    var angle = (ball.mesh.position.y - this.Paddles.right.mesh.position.y) / ((this.HEIGHT_PA * this.Paddles.right.mesh.scaling.y) / 2) * (Math.PI * 0.25);
                    ball.speed += 0.25;
                    ball.aggr.body.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
                    ball.aggr.body.setLinearVelocity(new BABYLON.Vector3(-Math.cos(angle), Math.sin(angle), 0).normalize().multiply(new BABYLON.Vector3(ball.speed, ball.speed, 0)), ball.mesh.position);
                    ball.bounces += 1;
                }
                ball.lastTouched = this.Paddles.right;
            }
        });
    }
    resetAfterGoal() {
        if (this.powerupHandler.activePWR) {
            this.powerupHandler.activePWR.mesh.dispose();
            this.powerupHandler.activePWR.aggr.dispose();
            this.powerupHandler.activePWR = null;
        }
        for (var i = 0; i < this.powerupHandler.Intervals.length; ++i) {
            clearInterval(this.powerupHandler.Intervals[i]);
        }
        this.powerupHandler.Intervals = [];
        this.Paddles.left.aggr.dispose();
        this.Paddles.right.aggr.dispose();
        this.Paddles.left.mesh.position = new BABYLON.Vector3(this.Paddles.left.mesh.position.x, 0, 0);
        this.Paddles.right.mesh.position = new BABYLON.Vector3(this.Paddles.right.mesh.position.x, 0, 0);
        this.Paddles.left.mesh.scaling.y = 1;
        this.Paddles.right.mesh.scaling.y = 1;
        this.Paddles.left.aggr = this.createPaddlesAggregate(this.Paddles.left);
        this.Paddles.right.aggr = this.createPaddlesAggregate(this.Paddles.right);
        this.Paddles.left.up = true;
        this.Paddles.left.down = true;
        this.Paddles.right.up = true;
        this.Paddles.right.down = true;
        for (let i = 0; i < this.Balls.length; ++i) {
            this.Balls[i].aggr.dispose();
            if (i > 0)
                this.Balls[i].mesh.dispose();
        }
        for (let i = 0; i < this.Balls.length - 1; ++i)
            this.Balls.pop();
        this.Balls[0].mesh.position = new BABYLON.Vector3.Zero();
        this.Balls[0].aggr = new BABYLON.PhysicsAggregate(this.Balls[0].mesh, BABYLON.PhysicsShapeType.SPHERE, { mass: 1, friction: 0, restitution: 1.0 }, this.scene);
        this.Balls[0].speed = this.startSpeed;
        this.detectGoal(this.Balls[0]);
        this.ballBounces(this.Balls[0]);
        this.powerupHandler.setupPowerups(this.Balls[0]);
        this.is_goal_scored = false;
    }
    createSkybox() {
        const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 2000 }, this.scene);
        skybox.infiniteDistance = true;
        const skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMaterial", this.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        const cubeTexture = new BABYLON.CubeTexture("/assets/skyboxMeteor4K/", this.scene, [
            "px.jpg", "py.jpg", "pz.jpg",
            "nx.jpg", "ny.jpg", "nz.jpg"
        ]);
        cubeTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.reflectionTexture = cubeTexture;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.reflectionTexture.level = 1.5;
        skybox.material = skyboxMaterial;
        this.scene.onBeforeRenderObservable.add(() => {
            skybox.rotation.y += 0.0002;
            skybox.rotation.x += 0.0001;
        });
    }
    addPowerupHandler(powerupHandler) {
        this.powerupHandler = powerupHandler;
    }
    constructor(scene, engine, hk, miscHandler, removeEvents) {
        this.deleteScene = false;
        this.sceneStopped = false;
        this.WIDTH = 100;
        this.HEIGHT = 50;
        this.DEPTH = 1;
        this.UP_WALL = 0;
        this.DOWN_WALL = 1;
        this.LEFT_WALL = 2;
        this.RIGHT_WALL = 3;
        this.FLOOR_WALL = 4;
        this.DEPTH_FLOOR = 100;
        this.TOUCH_GROUND3D = -(this.HEIGHT + 3) / 2;
        this.DIAMETER = 1.25;
        this.SEGMENTS = 16;
        this.WIDTH_PA = 0.5;
        this.HEIGHT_PA = 7;
        this.DEPTH_PA = 1;
        this.startSpeed = 60;
        this.score_p1 = 0;
        this.score_p2 = 0;
        this.is_goal_scored = false;
        this.Walls = { up: { mesh: null, aggr: null }, down: { mesh: null, aggr: null }, left: { mesh: null, aggr: null }, right: { mesh: null, aggr: null }, floor: { mesh: null, aggr: null } };
        this.name_p1 = "pl1";
        this.name_p2 = "pl2";
        this.next_p1 = "pl3";
        this.next_p2 = "pl4";
        this.match_over = false;
        this.game_over = false;
        this.pause = false;
        this.ballLaunched = true;
        this.Intervals = [];
        this.scene = scene;
        this.engine = engine;
        this.miscHandler = miscHandler;
        this.hk = hk;
        this.removeEvents = removeEvents;
    }
    async templateCreate3D(path, name, pos, rot, scale) {
        let meshes = null;
        await BABYLON.SceneLoader.ImportMeshAsync(null, path, name, this.scene).then((result) => {
            meshes = result.meshes;
            const rootMesh = meshes[0];
            rootMesh.position = pos;
            rootMesh.scaling = new BABYLON.Vector3(scale, scale, scale);
            rootMesh.rotation = rot;
            meshes.forEach(mesh => {
                this.miscHandler.spotLight.excludedMeshes.push(mesh);
                mesh.receiveShadows = true;
                if (mesh.name !== "__root__") {
                    this.miscHandler.shadowWindows.addShadowCaster(mesh, true);
                }
            });
        });
        return (meshes);
    }
    async createModels3D() {
        await this.templateCreate3D("assets/models3D/", "crab.glb", new BABYLON.Vector3(-45, this.TOUCH_GROUND3D, -20), new BABYLON.Vector3(0, -Math.PI / 4, 0), 3);
        await this.templateCreate3D("assets/models3D/", "minion.glb", new BABYLON.Vector3(-45, this.TOUCH_GROUND3D + 0.1, -20), new BABYLON.Vector3(0, -Math.PI / 4, 0), 20);
        await this.templateCreate3D("assets/models3D/", "shield.glb", new BABYLON.Vector3(-55, this.TOUCH_GROUND3D + 5, -3), new BABYLON.Vector3(-0.5, 3.2, 0), 5);
        var path = [
            new BABYLON.Vector3(-120, -100, -10),
            new BABYLON.Vector3(200, 100, 500),
        ];
        var frameRate = 40;
        var durationInSeconds = 2;
        var totalFrames = frameRate * durationInSeconds;
        var animation = new BABYLON.Animation("moveAlongPath", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keys = path.map((pos, i) => ({
            frame: i * (totalFrames / (path.length - 1)),
            value: pos
        }));
        animation.setKeys(keys);
        var meshesWars = await this.templateCreate3D("assets/models3D/", "starWars.glb", new BABYLON.Vector3(0, 0, +40), new BABYLON.Vector3(0, Math.PI / 4, 0), 5);
        meshesWars[0].position = path[0];
        meshesWars[0].animations = [animation];
        this.scene.beginAnimation(meshesWars[0], 0, totalFrames, false);
        var intervalId = setInterval(() => {
            this.scene.beginAnimation(meshesWars[0], 0, totalFrames, false);
        }, 30000);
        this.Intervals.push(intervalId);
        var pathWalk = [
            new BABYLON.Vector3(-100, this.TOUCH_GROUND3D - 0.5, -30),
            new BABYLON.Vector3(100, this.TOUCH_GROUND3D - 0.5, -30),
        ];
        var durationInSecondsWalk = 13;
        var totalFramesWalk = frameRate * durationInSecondsWalk;
        var animationWalk = new BABYLON.Animation("moveAlongPath", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keysWalk = pathWalk.map((pos, i) => ({
            frame: i * (totalFramesWalk / (pathWalk.length - 1)),
            value: pos
        }));
        animationWalk.setKeys(keysWalk);
        var meshesAstronaut = await this.templateCreate3D("assets/models3D/", "astronaut.glb", new BABYLON.Vector3(-30, this.TOUCH_GROUND3D - 0.5, -20), new BABYLON.Vector3(0, Math.PI / 2, 0), 2);
        meshesAstronaut[0].position = pathWalk[0];
        meshesAstronaut[0].animations = [animationWalk];
        setTimeout((async () => {
            this.scene.beginAnimation(meshesAstronaut[0], 0, totalFramesWalk, false);
            var intervalId = setInterval(() => {
                this.scene.beginAnimation(meshesAstronaut[0], 0, totalFramesWalk, false);
            }, 22500);
            this.Intervals.push(intervalId);
        }), 25000);
        var path2 = [
            new BABYLON.Vector3(150, -50, 50),
            new BABYLON.Vector3(-200, 50, 50),
        ];
        var durationInSeconds2 = 15;
        var frameRate = 40;
        var totalFrames2 = frameRate * durationInSeconds2;
        var animation2 = new BABYLON.Animation("moveAlongPath", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keys2 = path2.map((pos, i) => ({ frame: i * (totalFrames2 / (path2.length - 1)), value: pos }));
        animation2.setKeys(keys2);
        var rotationAnimation = new BABYLON.Animation("rotationAstronaut", "rotation.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var rotationKeys = [
            { frame: 0, value: 0 },
            { frame: totalFrames2, value: -2 * Math.PI }
        ];
        rotationAnimation.setKeys(rotationKeys);
        BABYLON.SceneLoader.ImportMesh(null, "assets/models3D/", "astronaut2Doc.glb", this.scene, (meshes) => {
            var rootMesh = meshes[0];
            rootMesh.position = new BABYLON.Vector3(-30, this.TOUCH_GROUND3D - 0.5, -20);
            rootMesh.scaling = new BABYLON.Vector3(5, 5, 5);
            meshes.forEach(mesh => {
                this.miscHandler.spotLight.excludedMeshes.push(mesh);
                this.miscHandler.rightLight.excludedMeshes.push(mesh);
                this.miscHandler.leftLight.excludedMeshes.push(mesh);
                meshes[0].position = path2[0];
                mesh.animations = [animation2, rotationAnimation];
                setTimeout((() => {
                    var intervalId = setInterval(() => {
                        this.scene.beginAnimation(mesh, 0, totalFrames2, false);
                    }, 30000);
                    this.Intervals.push(intervalId);
                    ;
                }), 3000);
            });
        });
        var pathWalk2 = [
            new BABYLON.Vector3(100, this.TOUCH_GROUND3D, -30),
            new BABYLON.Vector3(-50, this.TOUCH_GROUND3D, -100),
        ];
        var durationInSecondsWalk3 = 14;
        var totalFramesWalk2 = frameRate * durationInSecondsWalk3;
        var animationWalk2 = new BABYLON.Animation("moveAlongPath", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keysWalk2 = pathWalk2.map((pos, i) => ({
            frame: i * (totalFramesWalk2 / (pathWalk2.length - 1)),
            value: pos
        }));
        animationWalk2.setKeys(keysWalk2);
        var meshesHalo = await this.templateCreate3D("assets/models3D/", "halo.glb", new BABYLON.Vector3(-30, this.TOUCH_GROUND3D - 0.5, -20), new BABYLON.Vector3(0, -Math.PI / 1.5, 0), 6);
        meshesHalo[0].position = pathWalk2[0];
        meshesHalo[0].animations = [animationWalk2];
        this.scene.beginAnimation(meshesHalo[0], 0, totalFramesWalk2, false);
        var intervalId = setInterval(() => {
            this.scene.beginAnimation(meshesHalo[0], 0, totalFramesWalk2, false);
        }, 22000);
        this.Intervals.push(intervalId);
        var pathWalk3 = [
            new BABYLON.Vector3(-100, 20, 10),
            new BABYLON.Vector3(100, 20, 10),
        ];
        var durationInSecondsWalk4 = 4;
        var totalFramesWalk3 = frameRate * durationInSecondsWalk4;
        var animationWalk3 = new BABYLON.Animation("moveAlongPath", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keysWalk3 = pathWalk3.map((pos, i) => ({
            frame: i * (totalFramesWalk3 / (pathWalk3.length - 1)),
            value: pos
        }));
        animationWalk3.setKeys(keysWalk3);
        var meshes2 = await this.templateCreate3D("assets/models3D/", "nyan.glb", new BABYLON.Vector3(-30, 0 - 0.5, -20), new BABYLON.Vector3(0, Math.PI, 0), 1);
        meshes2[0].scaling.x = -1;
        meshes2[0].position = pathWalk3[0];
        meshes2[0].animations = [animationWalk3];
        setTimeout((async () => {
            this.scene.beginAnimation(meshes2[0], 0, totalFramesWalk3, false);
            var intervalId = setInterval(() => {
                this.scene.beginAnimation(meshes2[0], 0, totalFramesWalk3, false);
            }, 27500);
            this.Intervals.push(intervalId);
        }), 4500);
        var pathWalk4 = [
            new BABYLON.Vector3(-60, -125, 200),
            new BABYLON.Vector3(10, 125, 200),
        ];
        var durationInSecondsWalk5 = 5;
        var totalFramesWalk4 = frameRate * durationInSecondsWalk5;
        var animationWalk4 = new BABYLON.Animation("moveAlongPath", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keysWalk4 = pathWalk4.map((pos, i) => ({
            frame: i * (totalFramesWalk4 / (pathWalk4.length - 1)),
            value: pos
        }));
        animationWalk4.setKeys(keysWalk4);
        BABYLON.SceneLoader.ImportMesh(null, "assets/models3D/", "OW.glb", this.scene, (meshes) => {
            var rootMesh = meshes[0];
            rootMesh.position = new BABYLON.Vector3(-30, 0 - 0.5, -20);
            rootMesh.rotation = new BABYLON.Vector3(0, Math.PI * 2.2, 0);
            rootMesh.scaling = new BABYLON.Vector3(2.5, 2.5, 2.5);
            meshes[0].position = pathWalk4[0];
            meshes[0].animations = [animationWalk4];
            setTimeout((async () => {
                this.scene.beginAnimation(meshes[0], 0, totalFramesWalk4, false);
                var intervalId = setInterval(() => {
                    this.scene.beginAnimation(meshes[0], 0, totalFramesWalk4, false);
                }, 37500);
                this.Intervals.push(intervalId);
            }), 15000);
        });
        var pathuss = [
            new BABYLON.Vector3(-600, 200, 900),
            new BABYLON.Vector3(100, -75, -10),
        ];
        var frameRateuss = 40;
        var durationInSecondsuss = 2;
        var totalFramesuss = frameRateuss * durationInSecondsuss;
        var animationuss = new BABYLON.Animation("moveAlongPath", "position", frameRateuss, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keysuss = pathuss.map((pos, i) => ({
            frame: i * (totalFramesuss / (pathuss.length - 1)),
            value: pos
        }));
        animationuss.setKeys(keysuss);
        var meshesUss = await this.templateCreate3D("assets/models3D/", "uss_enterprise__strange_new_worlds.glb", new BABYLON.Vector3(0, 100, 800), new BABYLON.Vector3(-Math.PI / 10, -Math.PI / 4, Math.PI / 5), 2);
        meshesUss[0].position = pathuss[0];
        meshesUss[0].animations = [animationuss];
        setTimeout((async () => {
            this.scene.beginAnimation(meshesUss[0], 0, totalFramesuss, false);
            var intervalId = setInterval(() => {
                this.scene.beginAnimation(meshesUss[0], 0, totalFramesuss, false);
            }, 45000);
            this.Intervals.push(intervalId);
        }), 17500);
        var meshes = await this.templateCreate3D("assets/models3D/", "starship_troopers_arachnid_warrior.glb", new BABYLON.Vector3(45.1, this.TOUCH_GROUND3D, -17.5), new BABYLON.Vector3(0, -Math.PI / 1.2, 0), 4.75);
        var path2 = [
            new BABYLON.Vector3(-30, -500, 85),
            new BABYLON.Vector3(10, -280, 85),
            new BABYLON.Vector3(10, -250, 85),
            new BABYLON.Vector3(10, -230, 85),
            new BABYLON.Vector3(10, -215, 85),
            new BABYLON.Vector3(10, -215, 85),
            new BABYLON.Vector3(10, -215, 85),
            new BABYLON.Vector3(10, -215, 85),
            new BABYLON.Vector3(10, -215, 85),
            new BABYLON.Vector3(10, -215, 85),
            new BABYLON.Vector3(10, -215, 85),
            new BABYLON.Vector3(-30, -500, 85),
        ];
        var durationInSeconds6 = 20;
        var totalFrames2 = frameRate * durationInSeconds6;
        var animation2 = new BABYLON.Animation("moveAlongPath", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keys2 = path2.map((pos, i) => ({ frame: i * (totalFrames2 / (path2.length - 1)), value: pos }));
        animation2.setKeys(keys2);
        BABYLON.SceneLoader.ImportMesh(null, "assets/models3D/", "astronaut2DocNew.glb", this.scene, (meshes) => {
            var rootMesh = meshes[0];
            rootMesh.position = new BABYLON.Vector3(-30, -500, 85);
            rootMesh.scaling = new BABYLON.Vector3(50, 50, 50);
            meshes.forEach(mesh => {
                this.miscHandler.spotLight.excludedMeshes.push(mesh);
                this.miscHandler.rightLight.excludedMeshes.push(mesh);
                this.miscHandler.leftLight.excludedMeshes.push(mesh);
            });
            this.miscHandler.spotLight.excludedMeshes.push(meshes[0]);
            meshes[0].animations = [animation2];
            this.scene.beginAnimation(meshes[0], 0, totalFrames2, false);
            var intervalId = setInterval(() => {
                this.scene.beginAnimation(meshes[0], 0, totalFrames2, false);
            }, 60000);
            this.scene.beginAnimation(meshes[0], 0, totalFrames2, false);
            this.Intervals.push(intervalId);
        });
        setTimeout((async () => {
            const pathsnoopy = [
                new BABYLON.Vector3(70, this.TOUCH_GROUND3D, -70),
                new BABYLON.Vector3(-100, this.TOUCH_GROUND3D, -10),
            ];
            const frameRateSnoopy = 40;
            const durationInSecondsnoopy = 20;
            const totalFrameSnoopy = frameRateSnoopy * durationInSecondsnoopy;
            const animationSnoopy = new BABYLON.Animation("moveAlongPath", "position", frameRateSnoopy, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
            const keysnoopy = pathsnoopy.map((pos, i) => ({
                frame: i * (totalFrameSnoopy / (pathsnoopy.length - 1)),
                value: pos
            }));
            animationSnoopy.setKeys(keysnoopy);
            var meshesSnoopy = await this.templateCreate3D("assets/models3D/", "snoopy.glb", new BABYLON.Vector3(-30, this.TOUCH_GROUND3D - 0.5, -20), new BABYLON.Vector3(0, -Math.PI / 3, 0), 20);
            meshesSnoopy[0].position = pathsnoopy[0];
            meshesSnoopy[0].animations = [animationSnoopy];
            this.scene.beginAnimation(meshesSnoopy[0], 0, totalFrameSnoopy, false);
            var intervalId = setInterval(() => {
                this.scene.beginAnimation(meshesSnoopy[0], 0, totalFrameSnoopy, false);
            }, 36000);
            this.Intervals.push(intervalId);
        }), 10000);
    }
}
