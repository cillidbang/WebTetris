import {Arena} from "./arena.js";
import {Renderer} from "./Renderer.js";
import {Figure} from "./Figure.js";

export class GameHandler {

    running = true;


    constructor(gameWrapper) {
        gameWrapper.innerHTML = `<div class="board-grid"></div>`;
        const boardContainer = document.querySelector(".board-grid");

        this.arena = new Arena();
        this.renderer = new Renderer(this.arena);
        this.figureObj = new Figure()
        this.figure = this.figureObj.getFigure();

        this.defaultColumn = 4;

        this.renderer.render(boardContainer);
        this.addControlListeners();
        this.addRenderEventListener();
        this.gameLoop();
    }

    stop() {
        this.running = false;
    }

    addRenderEventListener() {
        window.addEventListener('color-it', e => {
            this.renderer.displayPlacedCells(e.detail);
        });
    }

    addControlListeners() {
        window.addEventListener('keydown', async e => {
            if (e.key === "ArrowUp") {
                this.figure = this.figureObj.rotateRight(this.figure);
                dispatchEvent(new CustomEvent("rotate-figure", {detail: this.figure, bubbles: true, composed: true}));
            } else if (e.key === "ArrowRight") {
                dispatchEvent(new CustomEvent("move-right", {bubbles: true, composed: true}));
            } else if (e.key === "ArrowLeft") {
                dispatchEvent(new CustomEvent("move-left", {bubbles: true, composed: true}));
            }
        });
    }

    async gameLoop() {
        while (this.running) {
            this.figure = this.figureObj.getRandomFigure();
            const figureColor = this.figureObj.getRandomColor();
            await this.arena.throwFigureUntilCollision(this.defaultColumn, this.figure, figureColor);
        }
    }
}