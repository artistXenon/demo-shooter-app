import { Engine } from "artistic-engine";
import { Player } from "./sprites/player";
import { Hearts } from "./sprites/hearts";

export class Global {
    public static readonly base = 5;
    public static score: number = 0;
    public static highScore: number = 0;
    public static engine: Engine;
    public static player: Player;
    public static hearts: Hearts;
}