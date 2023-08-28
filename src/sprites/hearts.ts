import { Sprite } from "artistic-engine/sprite";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import { Global } from "../global";

export class Hearts extends Sprite {

    public fill: number = 5;
    constructor() {
        super();
        this.X = 20;
        this.Y = 20;
    }
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        if (this.fill === 0) {
            for (const b of Bullet.instances) {
                b.detach();
            }
            for (const e of Enemy.instances) {
                e.detach();
            }
            Global.player.X = 960 - Global.base * 9 / 2;
            Global.player.Y = 800;
            Global.score = 0;
            this.fill = 5;
        }
        for (let i = 0; i < this.fill; i++) {
            context.fillStyle = "red";
            const baseX = i * Global.base * 9;
            context.moveTo(baseX + Global.base * 2, 0);
            context.beginPath();
            context.lineTo(baseX + Global.base * 4, 0);
            context.lineTo(baseX + Global.base * 4, Global.base);
            context.lineTo(baseX + Global.base * 5, Global.base);
            context.lineTo(baseX + Global.base * 5, 0);
            context.lineTo(baseX + Global.base * 7, 0);
            context.lineTo(baseX + Global.base * 7, Global.base);
            context.lineTo(baseX + Global.base * 8, Global.base);
            context.lineTo(baseX + Global.base * 8, Global.base * 3);
            context.lineTo(baseX + Global.base * 7, Global.base * 3);
            context.lineTo(baseX + Global.base * 7, Global.base * 4);
            context.lineTo(baseX + Global.base * 6, Global.base * 4);
            context.lineTo(baseX + Global.base * 6, Global.base * 5);
            context.lineTo(baseX + Global.base * 5, Global.base * 5);
            context.lineTo(baseX + Global.base * 5, Global.base * 6);
            context.lineTo(baseX + Global.base * 4, Global.base * 6);
            context.lineTo(baseX + Global.base * 4, Global.base * 5);
            context.lineTo(baseX + Global.base * 3, Global.base * 5);
            context.lineTo(baseX + Global.base * 3, Global.base * 4);
            context.lineTo(baseX + Global.base * 2, Global.base * 4);
            context.lineTo(baseX + Global.base * 2, Global.base * 3);
            context.lineTo(baseX + Global.base, Global.base * 3);
            context.lineTo(baseX + Global.base, Global.base);
            context.lineTo(baseX + Global.base * 2, Global.base);
            context.lineTo(baseX + Global.base * 2, 0);
            context.closePath();
            context.fill();
            context.fillStyle = "white";
            context.fillRect(baseX + Global.base * 5, Global.base * 3, Global.base, Global.base);
            context.fillRect(baseX + Global.base * 6, Global.base * 2, Global.base, Global.base);
        }
        
    }

    public onControl(e: Event) {
        console.log(e);
    }
}