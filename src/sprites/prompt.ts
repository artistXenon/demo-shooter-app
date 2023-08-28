import { IPointerListener } from "artistic-engine/event";
import { Sprite } from "artistic-engine/sprite";
import { ResolutionVector2D } from "../helper/resolution-vector2D";

export class Prompt extends Sprite implements IPointerListener {
    protected boxW: number;
    protected boxH: number;
    constructor(w: number, h: number) {
        super();
        this.boxW = w;
        this.boxH = h;
        this.Dimension = ResolutionVector2D.baseVector;
    }

    get PointerRegistered(): boolean {
        return true;
    }
    get RecieveEventsOutOfBound(): boolean {
        return true;
    }
    onPointer(e: PointerEvent): boolean {
        // throw new Error("Method not implemented.");
        return true;
    }
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        const x = (ResolutionVector2D.baseVector.X - this.boxW) / 2;
        const y = (ResolutionVector2D.baseVector.Y - this.boxH) / 2;
        context.fillStyle = 'grey';
        context.fillRect(x, y, this.boxW, this.boxH);

        
    }
}