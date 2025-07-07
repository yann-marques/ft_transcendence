declare const BABYLON : any;
declare function HavokPhysics(): Promise<any>;

import { meshHandler } from "./meshHandler.js";
import { RouterHandler } from "../common/routeHandler.js";
import { addWinner } from "../utils.js";

export class miscHandler
{
	private	engine			:	BABYLON.Engine;
	private	scene			:	BABYLON.Scene;
	private	meshHandler		:	meshHandler;
	private	canvas			:	HTMLCanvasElement | null;

	public	camera			:	BABYLON.FreeCamera;
	public	HemiLight		:	BABYLON.HemisphericLight;
	public	HemiLight2		:	BABYLON.HemisphericLight;
	public	spotLight		:	BABYLON.SpotLight;
	public	spotObj3D		:	BABYLON.SpotLight;
	public	alarmLight_l	:	BABYLON.PointLight;
	public	alarmLight_r	:	BABYLON.PointLight;
	public	leftLight		:	BABYLON.PointLight;
	public	rightLight		:	BABYLON.PointLight;
	public	spotLightOut	:	BABYLON.SpotLight;

	public	shadowWindows	:	BABYLON.ShadowGenerator;
	public	fullscreen		:	boolean = (window.innerHeight == screen.height);

	public	players			:	Array<Array<string>> = [];
	public	winners			:	Array<Array<string>> = [];

	public addWinner(winner : string)
	{
		if (winner == "p1")
		{
			this.winners.push(this.players[0]);
			addWinner(this.players[0][0]);
		}
		else
		{
			this.winners.push(this.players[1]);
			addWinner(this.players[1][0]);
		}
		this.players.splice(0, 2);
	}

	public updatePlayers()
	{
		if (this.players.length < 2)
			return ;
		this.meshHandler.txt_name_p1.text = this.players[0][0].slice(0, 7);
		this.meshHandler.txt_name_p2.text = this.players[1][0].slice(0, 7);
		this.meshHandler.name_p1 = this.players[0][0];
		this.meshHandler.name_p2 = this.players[1][0];
	}

	public updateNextPlayer(winner : string)
	{
		if (this.players.length > 3)
		{
			this.meshHandler.next_p1 = this.players[2][0];
			this.meshHandler.next_p2 = this.players[3][0];
		}
		else
		{
			if (this.winners && this.winners.length > 1)
			{
				this.meshHandler.next_p1 = this.winners[0][0];
				this.meshHandler.next_p2 = this.winners[1][0];
			}
			else if (this.winners && this.winners.length > 0)
			{
				this.meshHandler.next_p1 = this.winners[0][0];
				this.meshHandler.next_p2 = this.meshHandler.getWinnerName(winner);
			}
			else
			{
				if (this.players.length > 3)
				{
					this.meshHandler.next_p1 = this.meshHandler.getWinnerName(winner);
					this.meshHandler.next_p2 = "next Winner";
				}
				else
				{
					this.meshHandler.next_p1 = "nobody";
					this.meshHandler.next_p2 = "nobody";
				}
			}
		}
	}

	public changePlayerLights()
	{
		if (this.players.length < 2)
			return ;

		var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.players[0][1]);

		this.leftLight.diffuse = new BABYLON.Color3(parseInt(rgb[1], 16) / 255, parseInt(rgb[2], 16) / 255, parseInt(rgb[3], 16) / 255);
		
		var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.players[1][1]);
		this.rightLight.diffuse = new BABYLON.Color3(parseInt(rgb[1], 16) / 255, parseInt(rgb[2], 16) / 255, parseInt(rgb[3], 16) / 255);
	}

	public initPlayers()
	{
		var rawArray = localStorage.getItem('customPlayer');
		var parseArray = JSON.parse(rawArray);
		var rawArrayPlayer = localStorage.getItem('playersInGame');
		var parseArrayPlayer = JSON.parse(rawArrayPlayer);

		var tpPlayers = parseArray.map(u => [u.username, u.color]);
		this.players = parseArrayPlayer.map(u => [u, "0"]);
		this.winners = Object.assign([], this.players);
		this.winners.splice(0);

		for (let i = 0; i < this.players.length; i++)
		{
			for (let ii = 0; ii < tpPlayers.length; ii++)
			{
				if (this.players[i][0] == tpPlayers[ii][0])
					this.players[i][1] = tpPlayers[ii][1];
			}
		}

		const key_lobby = localStorage.getItem('lobby');
		if (key_lobby == "1vIA")
		{
			this.players[1][0] = "AI";
			this.players[1][1] = "#ffffff";
		}
		if (this.players.length < 2)
		{
			this.meshHandler.game_over = true;
			const router = new RouterHandler;
			router.changeData('/lobby');
		}
	}

	public createLight()
	{
		this.alarmLight_l = new BABYLON.PointLight("alarmLight", new BABYLON.Vector3(-70, 0, -20));
		this.alarmLight_l.intensity = 0;

		this.alarmLight_r = new BABYLON.PointLight("alarmLight", new BABYLON.Vector3(70, 0, -20));
		this.alarmLight_r.intensity = 0;

		this.leftLight = new BABYLON.PointLight("alarm2", new BABYLON.Vector3(-(this.meshHandler.WIDTH / 2 - 5), 0, -5));
		this.leftLight.intensity = 20000;
		this.leftLight.diffuse = new BABYLON.Color3(0, 0, 0);

		this.rightLight = new BABYLON.PointLight("alarm2", new BABYLON.Vector3((this.meshHandler.WIDTH / 2 - 5), 0, -5));
		this.rightLight.intensity = 20000;
		this.rightLight.diffuse = new BABYLON.Color3(0, 0, 0);

		this.HemiLight2 = new BABYLON.HemisphericLight("HemiLight2", new BABYLON.Vector3(0, 0, -1));
		this.HemiLight2.intensity = 0.005;
		
		this.spotLight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 100, 100), new BABYLON.Vector3(0, -1, -1), Math.PI / 2, 10, this.scene);
		this.spotLight.intensity = 5000000;
		this.spotLight.diffuse = new BABYLON.Color3(0.15, 0.25, 0.4);

		this.spotObj3D = new BABYLON.SpotLight("spotLight3D", new BABYLON.Vector3(0, 20, 20), new BABYLON.Vector3(0, -5, -5), Math.PI / 2, 10, this.scene);
		this.spotObj3D.intensity = 3000;
		this.spotObj3D.diffuse = new BABYLON.Color3(0.15, 0.25, 0.4);
		
		this.spotLightOut = new BABYLON.SpotLight("spotLightOut", new BABYLON.Vector3(0, 0, -3), new BABYLON.Vector3(0, 0, 1), Math.PI / 2, 10, this.scene);
		this.spotLightOut.intensity = 100000;
		this.spotLightOut.diffuse = new BABYLON.Color3(0.15, 0.25, 0.4);
	}

	public ShadowGenSpot(light : BABYLON.SpotLight) : BABYLON.ShadowGenerator
	{
		var ShadowBuf = new BABYLON.ShadowGenerator(2048, light);
		ShadowBuf.bias = 0.00002;

		ShadowBuf.useContactHardeningShadow = true;
		ShadowBuf.filteringQuality = BABYLON.ShadowGenerator.QUALITY_LOW;
		return (ShadowBuf);
	}

	public createShadows()
	{
		this.shadowWindows = this.ShadowGenSpot(this.spotLight);
		this.spotLight.shadowEnabled = true;

		this.meshHandler.Walls.floor.mesh.receiveShadows = true;
		this.shadowWindows.addShadowCaster(this.meshHandler.Walls.floor.mesh);

		this.meshHandler.window.mesh.isVisible = true;
		this.meshHandler.window.mesh.receiveShadows = true;
		this.shadowWindows.addShadowCaster(this.meshHandler.window.mesh);

		this.meshHandler.Paddles.left.mesh.isVisible = true;
		this.meshHandler.Paddles.right.mesh.isVisible = true;
		this.meshHandler.Balls[0].mesh.isVisible = true;
		this.shadowWindows.addShadowCaster(this.meshHandler.Paddles.left.mesh);
		this.shadowWindows.addShadowCaster(this.meshHandler.Paddles.right.mesh);
		this.shadowWindows.addShadowCaster(this.meshHandler.Balls[0].mesh);
	}

	public shakeCamera(alarmLight : BABYLON.PointLight)
	{
		
		const shakeDuration = 1000;
		const shakeIntensity = 0.5;
		const startTime = Date.now();

		const originalPosition = {
			x: this.camera.position.x,
			y: this.camera.position.y,
			z: this.camera.position.z
		};
		const interval = setInterval(() =>
		{
			const elapsed = Date.now() - startTime;
			if (elapsed >= shakeDuration) {
				clearInterval(interval);
				this.camera.position.set(
					originalPosition.x,
					originalPosition.y,
					originalPosition.z
				);
				alarmLight.intensity = 0;
			}
			else
			{
				if (elapsed < shakeDuration / 3)
				{
					alarmLight.intensity = 10000;
					alarmLight.diffuse = new BABYLON.Color3(1, 0, 0);
				}
				if (elapsed > shakeDuration / 3 && elapsed < 2 * (shakeDuration / 3))
					alarmLight.diffuse = new BABYLON.Color3(0, 0, 0);
				if (elapsed > 2 * (shakeDuration / 3))
					alarmLight.diffuse = new BABYLON.Color3(1, 0, 0);
				this.camera.position.x = originalPosition.x + (Math.random() - 0.5) * shakeIntensity;
				this.camera.position.y = originalPosition.y + (Math.random() - 0.5) * shakeIntensity;
				this.camera.position.z = originalPosition.z + (Math.random() - 0.5) * shakeIntensity;
			}
		}, 16);
	}

	public createCamera()
	{
		if (this.fullscreen)
		{
			this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, -2.6, 0), this.scene);
			this.camera.setTarget(new BABYLON.Vector3(0, -15.3, 198.8));
			this.camera.fov = 1.25;
		}
		else
		{
			this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 3.5, 0), this.scene);
			this.camera.setTarget(new BABYLON.Vector3(0, -9.5, 198.5));
			this.camera.fov = (this.engine.getRenderHeight() / this.engine.getRenderWidth());
		}
		this.camera.attachControl(this.canvas, true);


		const pathWalk3 = [
		new BABYLON.Vector3(0, 0, 0),
		(!this.fullscreen ? new BABYLON.Vector3(0, 3.5, -131.5) : new BABYLON.Vector3(0, -2.6, -62.4)),
		];
		var frameRate = 40;
		var durationInSecondsWalk = 4;
		const totalFramesWalk3 = frameRate * durationInSecondsWalk;
		const animationWalk3 = new BABYLON.Animation(
		"moveAlongPath",
		"position",
		frameRate,
		BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
		BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
		);
		const keys3 = pathWalk3.map((pos, i) => ({
		frame: i * (totalFramesWalk3 / (pathWalk3.length - 1)),
		value: pos
		}));
		animationWalk3.setKeys(keys3);
		
		this.camera.animations = [animationWalk3];
		this.scene.beginAnimation(this.camera, 0, totalFramesWalk3, false, 1.0, (() => {this.meshHandler.ballLaunched = false}));
	}

	public addMeshHandler(meshHandler : meshHandler)
	{
		this.meshHandler = meshHandler;
	}

	constructor (engine : BABYLON.Engine, scene : BABYLON.Scene | null, canvas : HTMLCanvasElement | null)
	{
		this.engine = engine;
		this.scene = scene;
		this.canvas = canvas;
	}
}

