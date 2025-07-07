var X = 0;
var Y = 1;
var Z = 2;
var DT = 30;
export class ia {
    stop() {
        this.run = false;
        clearInterval(this.interval1);
        clearInterval(this.interval2);
    }
    constructor(game, meshHandler) {
        this.run = true;
        this.ball_velocity = new BABYLON.Vector3(0, 0, 0);
        this.ball_pos = [];
        this.ball_pos.push(0);
        this.ball_pos.push(0);
        this.ball_pos.push(0);
        this.ball_pos = game.get_ball_pos();
        this.last_ball_pos = this.ball_pos;
        this.last_paddle_pos = 0;
        this.paddleX = game.get_paddle_x();
        this.paddleY = game.get_paddle_y();
        this.supposedPaddleY_new = game.get_paddle_y();
        this.supposedPaddleY_old = game.get_paddle_y();
        this.pdl_velo_y = game.get_paddle_velo();
        this.up = false;
        this.down = false;
        this.predictedY = 0;
        this.predictedW = 0;
        game.stop_moving();
        this.diff = 0;
        this.interval1 = setInterval(() => {
            if (this.ball_velocity.y == 0)
                this.predictedY = 0;
            if (this.up == true) {
                this.supposedPaddleY_new = this.supposedPaddleY_old + this.pdl_velo_y * (DT / 1000);
                this.supposedPaddleY_old = this.supposedPaddleY_new;
            }
            else if (this.down == true) {
                this.supposedPaddleY_new = this.supposedPaddleY_old + (-this.pdl_velo_y) * (DT / 1000);
                this.supposedPaddleY_old = this.supposedPaddleY_new;
            }
            var gap = 0;
            if (this.last_paddle_pos < 0)
                gap = -1;
            else if (this.last_paddle_pos > 0)
                gap = 1;
            var biais = 2;
            this.diff = (this.predictedY + biais * gap) - this.supposedPaddleY_new;
            if (Math.abs(this.diff) > (Math.floor(Math.random() * (2 - 1 + 1)) + 1) &&
                this.last_ball_pos[X] - this.paddleX < this.ball_pos[X] - this.paddleX) {
                if (this.diff > 0) {
                    this.up = true;
                    this.down = false;
                    game.go_up();
                }
                else {
                    this.up = false;
                    this.down = true;
                    game.go_down();
                }
            }
            else if (this.last_ball_pos[X] - this.paddleX > this.ball_pos[X] - this.paddleX &&
                (this.supposedPaddleY_new > 1 || this.supposedPaddleY_new < -1)) {
                if (this.supposedPaddleY_new < -1) {
                    this.up = true;
                    this.down = false;
                    game.go_up();
                }
                else if (this.supposedPaddleY_new > 1) {
                    this.up = false;
                    this.down = true;
                    game.go_down();
                }
            }
            else {
                this.up = false;
                this.down = false;
                game.stop_moving();
            }
        }, DT);
        this.interval2 = setInterval(() => {
            if (!this.ball_velocity)
                return;
            this.last_ball_pos = this.ball_pos;
            this.ball_pos = game.get_ball_pos();
            this.ball_velocity = game.get_ball_velocity();
            const ballY = this.ball_pos[Y];
            const ballX = this.ball_pos[X];
            this.paddleX = game.get_paddle_x();
            this.paddleY = game.get_paddle_y();
            this.last_paddle_pos = game.get_paddle_Y_l();
            this.supposedPaddleY_new = this.paddleY;
            this.supposedPaddleY_old = this.paddleY;
            let bufY = ballY;
            let bufX = ballX;
            let velX = this.ball_velocity.x;
            let velY = this.ball_velocity.y;
            const wallTop = meshHandler.Walls.up.mesh.position.y;
            const wallBot = meshHandler.Walls.down.mesh.position.y;
            if (Math.abs(velX) > 1) {
                while (true) {
                    let timeToPaddle = (this.paddleX - bufX) / velX;
                    let supposedY = bufY + (velY * timeToPaddle);
                    if (supposedY <= wallTop && supposedY >= wallBot) {
                        this.predictedY = supposedY;
                        break;
                    }
                    if (supposedY > wallTop) {
                        let timeToWall = (wallTop - bufY) / velY;
                        bufX += velX * timeToWall;
                        bufY = wallTop;
                        velY *= -1;
                    }
                    else if (supposedY < wallBot) {
                        let timeToWall = (wallBot - bufY) / velY;
                        bufX += velX * timeToWall;
                        bufY = wallBot;
                        velY *= -1;
                    }
                    if (isNaN(bufX) || isNaN(bufY)) {
                        this.predictedY = 0;
                        break;
                    }
                }
            }
        }, 1001);
    }
}
