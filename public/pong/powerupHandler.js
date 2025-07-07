export class powerupHandler {
    shrinkAttack(ball, lastTouched, meshHandler, activePWR, Intervals, activeBoost, activeSlow) {
        var paddle = null;
        var startbounces = ball.bounces;
        if (meshHandler.Paddles.left != lastTouched)
            paddle = meshHandler.Paddles.left;
        if (meshHandler.Paddles.right != lastTouched)
            paddle = meshHandler.Paddles.right;
        paddle.up = true;
        paddle.down = true;
        if (paddle.mesh.scaling.y <= 0.5)
            return;
        paddle.mesh.scaling.y -= 0.25;
        var oldaggr = paddle.aggr;
        paddle.aggr = meshHandler.createPaddlesAggregate(paddle);
        oldaggr.dispose();
        activePWR.intervalId = setInterval((paddle) => {
            if (ball.bounces - startbounces > 5) {
                paddle.mesh.scaling.y += 0.25;
                oldaggr = paddle.aggr;
                paddle.aggr = meshHandler.createPaddlesAggregate(paddle);
                oldaggr.dispose();
                if (paddle.mesh.position.y > 0)
                    paddle.mesh.position.y -= 2;
                else
                    paddle.mesh.position.y += 2;
                paddle.up = true;
                paddle.down = true;
                clearInterval(activePWR.intervalId);
            }
        }, 100, paddle);
        Intervals.push(activePWR.intervalId);
    }
    speedBoost(ball, lastTouched, meshHandler, activePWR, Intervals, activeBoost, activeSlow) {
        var paddle = lastTouched;
        var startbounces = ball.bounces;
        if (meshHandler.Paddles.left == paddle) {
            if (activeBoost.left)
                return;
            activeBoost.left = true;
        }
        if (meshHandler.Paddles.right == paddle) {
            if (activeBoost.right)
                return;
            activeBoost.right = true;
        }
        var ballCollisionObs = ball.aggr.body.getCollisionObservable();
        var boost = ballCollisionObs.add((collisionEvent) => {
            if (collisionEvent.collider == paddle.aggr.body || collisionEvent.collidedAgainst == paddle.aggr.body) {
                ball.aggr.body.setLinearVelocity(ball.aggr.body.getLinearVelocity().multiply(new BABYLON.Vector3(1.5, 1.5, 0)), ball.mesh.position);
            }
        });
        activePWR.intervalId = setInterval((paddle) => {
            if (ball.bounces - startbounces > 4) {
                ballCollisionObs.remove(boost);
                if (meshHandler.Paddles.left == paddle)
                    activeBoost.left = false;
                if (meshHandler.Paddles.right == paddle)
                    activeBoost.right = false;
                clearInterval(activePWR.intervalId);
            }
        }, 100, paddle);
        Intervals.push(activePWR.intervalId);
    }
    putOffensive() {
        this.activePWR = { mesh: null, aggr: null, effect: null, intervalId: -1 };
        this.activePWR.mesh = BABYLON.MeshBuilder.CreateBox("upWall", { width: this.meshHandler.DIAMETER * 3.0, height: this.meshHandler.DIAMETER * 3.0, depth: this.meshHandler.DIAMETER * 3.0 }, this.scene);
        this.activePWR.mesh.rotate(new BABYLON.Vector3(0, 0, Math.PI * 0.25), 1);
        this.activePWR.mesh.position = new BABYLON.Vector3((Math.random() - 0.5) * 0.75 * this.meshHandler.WIDTH, (Math.random() - 0.5) * 0.75 * this.meshHandler.HEIGHT, 0);
        this.activePWR.mesh.material = new BABYLON.PBRMaterial("pbrMat", this.scene);
        this.activePWR.mesh.material.roughness = 0.25;
        this.activePWR.aggr = new BABYLON.PhysicsAggregate(this.activePWR.mesh, BABYLON.PhysicsShapeType.BOX, { mass: 0.0001 }, this.scene);
        this.activePWR.aggr.body.setAngularVelocity(new BABYLON.Vector3(1, 1, 1));
        this.activePWR.aggr.body.setAngularDamping(0);
        if (Math.random() > 0.5)
            this.activePWR.effect = this.shrinkAttack;
        else
            this.activePWR.effect = this.speedBoost;
    }
    expandDef(ball, lastTouched, meshHandler, activePWR, Intervals, activeBoost, activeSlow) {
        var paddle = lastTouched;
        var startbounces = ball.bounces;
        if (paddle.mesh.scaling.y >= 1.5)
            return;
        paddle.mesh.scaling.y += 0.25;
        var oldaggr = paddle.aggr;
        paddle.aggr = meshHandler.createPaddlesAggregate(paddle);
        oldaggr.dispose();
        if (paddle.mesh.position.y > 0)
            paddle.mesh.position.y -= 2;
        else
            paddle.mesh.position.y += 2;
        paddle.up = true;
        paddle.down = true;
        activePWR.intervalId = setInterval((paddle) => {
            if (ball.bounces - startbounces > 5) {
                paddle.mesh.scaling.y -= 0.25;
                oldaggr = paddle.aggr;
                paddle.aggr = meshHandler.createPaddlesAggregate(paddle);
                oldaggr.dispose();
                paddle.up = true;
                paddle.down = true;
                clearInterval(activePWR.intervalId);
            }
        }, 100, paddle);
        Intervals.push(activePWR.intervalId);
    }
    speedSlow(ball, lastTouched, meshHandler, activePWR, Intervals, activeBoost, activeSlow) {
        var paddle = null;
        var startbounces = ball.bounces;
        if (meshHandler.Paddles.left != lastTouched)
            paddle = meshHandler.Paddles.left;
        if (meshHandler.Paddles.right != lastTouched)
            paddle = meshHandler.Paddles.right;
        if (meshHandler.Paddles.left == paddle) {
            if (activeSlow.left)
                return;
            activeSlow.left = true;
        }
        if (meshHandler.Paddles.right == paddle) {
            if (activeSlow.right)
                return;
            activeSlow.right = true;
        }
        var ballCollisionObs = ball.aggr.body.getCollisionObservable();
        var boost = ballCollisionObs.add((collisionEvent) => {
            if (collisionEvent.collider == paddle.aggr.body || collisionEvent.collidedAgainst == paddle.aggr.body) {
                ball.aggr.body.setLinearVelocity(ball.aggr.body.getLinearVelocity().multiply(new BABYLON.Vector3(0.75, 0.75, 0)), ball.mesh.position);
            }
        });
        activePWR.intervalId = setInterval((paddle) => {
            if (ball.bounces - startbounces >= 2) {
                ballCollisionObs.remove(boost);
                if (meshHandler.Paddles.left == paddle)
                    activeSlow.left = false;
                if (meshHandler.Paddles.right == paddle)
                    activeSlow.right = false;
                clearInterval(activePWR.intervalId);
            }
        }, 100, paddle);
        Intervals.push(activePWR.intervalId);
    }
    putDeffensive() {
        this.activePWR = { mesh: null, aggr: null, effect: null, intervalId: -1 };
        this.activePWR.mesh = BABYLON.MeshBuilder.CreateBox("upWall", { width: this.meshHandler.DIAMETER * 3.0, height: this.meshHandler.DIAMETER * 3.0, depth: this.meshHandler.DIAMETER * 3.0 }, this.scene);
        this.activePWR.mesh.rotate(new BABYLON.Vector3(0, 0, Math.PI * 0.25), 1);
        this.activePWR.mesh.position = new BABYLON.Vector3((Math.random() - 0.5) * 0.75 * this.meshHandler.WIDTH, (Math.random() - 0.5) * 0.75 * this.meshHandler.HEIGHT, 0);
        this.activePWR.mesh.material = new BABYLON.PBRMaterial("pbrMat", this.scene);
        this.activePWR.mesh.material.roughness = 0.25;
        this.activePWR.aggr = new BABYLON.PhysicsAggregate(this.activePWR.mesh, BABYLON.PhysicsShapeType.BOX, { mass: 0.0001 }, this.scene);
        this.activePWR.aggr.body.setAngularVelocity(new BABYLON.Vector3(1, -1, 1));
        this.activePWR.aggr.body.setAngularDamping(0);
        if (Math.random() > 0.5)
            this.activePWR.effect = this.expandDef;
        else
            this.activePWR.effect = this.speedSlow;
    }
    setupPowerups(ball) {
        if (!this.powerups)
            return;
        var ballCollisionObs = ball.aggr.body.getCollisionObservable();
        var goal = ballCollisionObs.add((collisionEvent) => {
            var randNum = Math.random();
            if (this.activePWR == null && randNum * 100 <= 30
                && (((collisionEvent.collider == this.meshHandler.Paddles.left.aggr.body || collisionEvent.collidedAgainst == this.meshHandler.Paddles.left.aggr.body))
                    || (collisionEvent.collider == this.meshHandler.Paddles.right.aggr.body || collisionEvent.collidedAgainst == this.meshHandler.Paddles.right.aggr.body))) {
                if (this.powerups && randNum < 0.3 / 2)
                    this.putOffensive();
                else if (this.powerups)
                    this.putDeffensive();
            }
            if (this.activePWR != null
                && (collisionEvent.collider == this.activePWR.aggr.body || collisionEvent.collidedAgainst == this.activePWR.aggr.body)) {
                this.activePWR.aggr.dispose();
                this.activePWR.effect(ball, ball.lastTouched, this.meshHandler, this.activePWR, this.Intervals, this.activeBoost, this.activeSlow);
                ball.aggr.body.setLinearVelocity(ball.aggr.body.getLinearVelocity());
                this.activePWR.mesh.dispose();
                this.activePWR = null;
            }
        });
    }
    addMeshHandler(meshHandler) {
        this.meshHandler = meshHandler;
    }
    constructor(scene, powerups) {
        this.powerups = false;
        this.activePWR = null;
        this.activeBoost = { left: false, right: false };
        this.activeSlow = { left: false, right: false };
        this.Intervals = [];
        this.scene = scene;
        this.powerups = powerups;
    }
}
