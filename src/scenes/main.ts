import { IPointerListener } from "artistic-engine/event";
import { Sprite } from "artistic-engine/sprite";
import { Global } from "../global";

export class MainScene extends Sprite implements IPointerListener {

    constructor() {
        super();
        // this.attachChildren(new Prompt(400, 300));
    }

    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "black";
        context.fillRect(0, 0, 1920, 1080);
        context.fillStyle = "white";
        context.fillText("score: " + Global.score, 20, 100 );
        context.fillText("high score: " + Global.highScore, 20, 120 );
        // throw new Error("Method not implemented.");
    }
    get PointerRegistered(): boolean {
        return true;
    }
    get RecieveEventsOutOfBound(): boolean {
        return true;
    }
    onPointer(e: PointerEvent): boolean {
        // throw new Error("Method not implemented.");
        return false;
    }
}
