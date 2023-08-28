import { Sprite } from "artistic-engine/sprite";
import { Modifier, EaseFunctions } from "artistic-engine/modifiers";
import { Global } from "../global";
import { Enemy } from "./enemy";

export class Bullet extends Sprite {
    public static instances: Set<Bullet> = new Set();
    private my: boolean;
    private color: string;
    private mod: Modifier;
    constructor(my: boolean, x: number, y: number) {
        super();
        this.my = my;
        this.color = my ? "skyblue" : "pink";
        this.Width = 5;
        this.Height = 5;

        this.X = x;
        if (my) {
            this.mod = new Modifier(0, 1080, 500, (v) => {
                this.Y = y - v;
            }, EaseFunctions.EaseInCirc);
        } else {
            const t = Math.floor(Math.random() * 3);
            switch (t) {
                case 0: 
                    this.mod = new Modifier(0, 1080, 2500, (v) => {
                        this.Y = y + v;
                    });
                    break;
                case 1:
                    this.mod = new Modifier(0, 1080, 2500, (v) => {
                        this.Y = y + v;
                        this.X = x + 0.3 * v;
                    });
                    break;
                default:
                    this.mod = new Modifier(0, 1080, 2500, (v) => {
                        this.Y = y + v;
                        this.X = x - 0.3 * v;
                    });
            }
        }
        Global.engine.registerModifier(this.mod);
        Bullet.instances.add(this);
    }

    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        if (this.X < -5 || this.Y < -5 || this.X > 1920 || this.Y > 1080 || this.mod.Progress >=1) {
            this.detach();
        }

        if (!this.my) {
            const px = this.X - Global.player.X;
            const py = this.Y - Global.player.Y;
            const pw = Global.player.W;
            const ph = Global.player.H;
            if (px < pw && px > 0 && py < ph && py > 0) {
                Global.hearts.fill--;
                this.detach();
            }
        } else {
            for (const e of Enemy.instances) {
                // e.detach();
                
                const px = this.X - e.X;
                const py = this.Y - e.Y;
                const pw = e.W;
                const ph = e.H;
                if (px < pw && px > 0 && py < ph && py > 0) {
                    Global.score += 200;
                    if (e.type === 1 || e.type === 2) Global.score += 100;
                    if (Global.highScore < Global.score) {
                        Global.highScore = Global.score;
                    }
                    e.detach();
                    this.detach();
                }
            }
        }
        context.fillStyle = this.color;
        context.fillRect(0, 0, 5, 5);
    }
    
    public detach() {
        this.Parent?.detachChildren(this);
        Global.engine.unregisterModifier(this.mod);
        Bullet.instances.delete(this);
    }
}