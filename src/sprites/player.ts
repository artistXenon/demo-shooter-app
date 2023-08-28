import { Sprite } from "artistic-engine/sprite";
import { Bullet } from "./bullet";
import { Global } from "../global";

export class Player extends Sprite {    
    public key_up: boolean = false;
    public key_down: boolean = false;
    public key_left: boolean = false;
    public key_right: boolean = false;

    public shoot: boolean = true;
    public lastShoot = 0;

    private speed = 300; // pixel per sec

    constructor() {
        super();
        this.X = 960 - Global.base * 9 / 2;
        this.Y = 800

        this.W = 45;
        this.H = 30;
    }

    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        if (this.key_up) {
            this.Y -= this.speed * delay / 1000;
        } 
        if (this.key_down) {
            this.Y += this.speed * delay / 1000;
        } 
        if (this.key_left) {
            this.X -= this.speed * delay / 1000;
        } 
        if (this.key_right) {
            this.X += this.speed * delay / 1000;
        } 
        
        const t = Date.now();
        if (this.shoot && t - this.lastShoot > 200) {
            this.lastShoot = t;
            const b = new Bullet(true, this.X + 20, this.Y);
            this.Parent?.attachChildren(b);
        }

        context.fillStyle = "white";
        context.moveTo(Global.base * 3, 0);
        context.beginPath();
        context.lineTo(Global.base * 6, 0);
        context.lineTo(Global.base * 6, Global.base * 3);
        context.lineTo(Global.base * 9, Global.base * 3);
        context.lineTo(Global.base * 9, Global.base * 6);
        context.lineTo(0, Global.base * 6);
        context.lineTo(0, Global.base * 3);
        context.lineTo(Global.base * 3, Global.base * 3);
        context.lineTo(Global.base * 3, 0);
        context.closePath();
        context.fill();
    }

    public onControl(e: KeyboardEvent) {
        // console.log(e)
        switch (e.code) {
            case "ArrowRight":
                this.key_right = e.type === "keydown";
                break;
            case "ArrowLeft":
                this.key_left = e.type === "keydown";
                break;                
            case "ArrowUp":
                this.key_up = e.type === "keydown";
                break;
            case "ArrowDown":
                this.key_down = e.type === "keydown";
                break;
            // case "ControlLeft":
            //     this.shoot = e.type === "keydown";
            //     break;
            default:
                return;
        }
    }
}