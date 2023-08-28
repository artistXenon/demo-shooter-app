import './style.css';
import { Engine } from 'artistic-engine';
import { Sprite } from 'artistic-engine/sprite';
import { KeyboardEventGroup, PointerEventGroup } from 'artistic-engine/event';
import { MainScene } from './scenes/main';
import { EngineAssets } from './helper/engine-assets';
import { ResolutionVector2D } from './helper/resolution-vector2D';
import { Player } from './sprites/player';
import { Hearts } from './sprites/hearts';
import { Global } from './global';
import { Enemy } from './sprites/enemy';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<canvas id="main"></canvas>`;

const canvas = document.querySelector<HTMLCanvasElement>('canvas#main')!;
const engine = new Engine(canvas);
Global.engine = engine;

const scene = new MainScene();
engine.Scene = scene;

const player = new Player();
Global.player = player;

const hearts = new Hearts();
Global.hearts = hearts;

scene.attachChildren([player, hearts]);

addEventListener("resize", onResize);
onResize();

engine.start();

const assets = new EngineAssets(engine.AssetLoader);

const pointerEventGroup = new PointerEventGroup(engine);
pointerEventGroup.registerPointerListener(scene);
pointerEventGroup.registerEvent();
pointerEventGroup.setListenSequenceFirstInFirstTrigger(false);

const keyboarEventGroup = new KeyboardEventGroup(window);
keyboarEventGroup.setListener((e: Event) => player.onControl(<KeyboardEvent>e));
keyboarEventGroup.registerEvent();

let itv: number;
const at = [1000, 2000, 3000, 5000, 8000, 15000];
const time = [1000, 700, 500, 300, 200, 100];
function relevel(level: number) {
    if (Global.score > at[level]) {
        clearInterval(itv);
        itv = setInterval(relevel.bind(level + 1), time[level + 1]);
        Global.hearts.fill++;
    }
    scene.attachChildren(new Enemy(Math.floor(Math.random() * 4)));
}
itv = setInterval(relevel.bind(0), time[0]);


assets.onLoad = () => {
    // Global.FontPoppin = new FontBuilder("Poppin");
    // Global.FontQuicksand = new FontBuilder("Quicksand");
    // Global.FontVanilla = new FontBuilder("Vanilla");
    // setTimeout(() => scene.showAilre(), 1000);
};




function onResize() {  
    engine.resizeCanvas({ w: 1920, h: 1080 });
    ResolutionVector2D.baseVector.X = engine.Canvas.width;
    ResolutionVector2D.baseVector.Y = engine.Canvas.height;
    if (engine.Scene instanceof Sprite) {
        engine.Scene.Width = engine.Canvas.width;
        engine.Scene.Height = engine.Canvas.height;
    }
}
