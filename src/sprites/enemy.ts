import { Sprite } from "artistic-engine/sprite";
import { Bullet } from "./bullet";
import { Modifier } from "artistic-engine/modifiers";
import { Global } from "../global";

export class Enemy extends Sprite {    
    public static instances: Set<Enemy> = new Set();

    public key_up: boolean = false;
    public key_down: boolean = false;
    public key_left: boolean = false;
    public key_right: boolean = false;

    public lastShoot = 0;

    private speed = 300; // pixel per sec

    public type: number;
    
    private mod: Modifier;
    constructor(type: number) {
        super();
        this.type = type;
        this.W = 45;
        this.H = 30;
        const randomX = Math.random() * (1920 - 45);
        const randomY = Math.random() * 540;
        switch (type) {
            case 0:
                this.mod = new Modifier(1, 0, 5000, (v) => {
                    this.X = (1920 + this.W) * v - this.W;
                    this.Y = randomY + 1080 / 6 * Math.sin(v * 8);
                });
                break;
            case 1:
                this.mod = new Modifier(0, 1, 5000, (v) => {
                    this.X = Math.sin(v * 4) * 960;
                    this.Y = 540 * v - this.H;
                });
                break;
            case 2:
                this.mod = new Modifier(1, 0, 5000, (v) => {
                    this.X = 1920 - Math.sin(v * 4) * 960;
                    this.Y = 540 * v - this.H;
                });
                break;
            default:
                this.mod = new Modifier(0, 1, 5000, (v) => {
                    this.X = (1920 + this.W) * v - this.W;
                    this.Y = randomY + 1080 / 6 * Math.sin(v * 8);
                });
        }
        
        Global.engine.registerModifier(this.mod);

        Enemy.instances.add(this);
    }

    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        const px = this.X - Global.player.X;
        const py = this.Y - Global.player.Y;
        const pw = Global.player.W;
        const ph = Global.player.H;
        if (px < pw && px > 0 && py < ph && py > 0) {
            Global.hearts.fill--;
            this.detach();
        }

        if (this.mod.Progress >=1) {
            this.detach();
        }

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
        if (t - this.lastShoot > 500) {
            this.lastShoot = t;
            const b = new Bullet(false, this.X + 20, this.Y + 30);
            this.Parent?.attachChildren(b);
        }

        context.fillStyle = this.type === 1 || this.type === 2 ? "green" : "blue";
        context.moveTo(0, 0);
        context.beginPath();
        context.lineTo(Global.base * 9, 0);
        context.lineTo(Global.base * 9, Global.base * 3);
        context.lineTo(Global.base * 6, Global.base * 3);
        context.lineTo(Global.base * 6, Global.base * 6);
        context.lineTo(Global.base * 3, Global.base * 6);
        context.lineTo(Global.base * 3, Global.base * 3);
        context.lineTo(0, Global.base * 3);
        context.lineTo(0, 0);
        context.closePath();
        context.fill();
    }
    
    public detach() {
        this.Parent?.detachChildren(this);
        Global.engine.unregisterModifier(this.mod);
        Enemy.instances.delete(this);
        
    }
}