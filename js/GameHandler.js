import {Arena} from "./Arena.js";
import {Renderer} from "./Renderer.js";
import {Figure} from "./Figure.js";

export class GameHandler {

    running = true;
    static DEFAULT_COLUMN = 4;


    constructor(gameWrapper) {
        gameWrapper.innerHTML = `<div class="board-grid"></div>`;
        this.loadOptions();
        this.renderer.renderGrid();
        this.addControlListeners();
        this.addFigureMoveListener();
        this.gameLoop();
    }

    loadOptions() {
        this.arena = new Arena();
        this.renderer = new Renderer(this.arena);
        this.figureObj = new Figure();
        this.figure = this.figureObj.getFigure();
    }

    stop() {
        this.running = false;
    }

    addFigureMoveListener() {
        window.addEventListener('color-it', e => {
            this.renderer.renderFigureCells(e.detail);
        });
    }

    addControlListeners() {
        window.addEventListener('keydown', async e => {
            if (e.key === "ArrowUp") {
                this.figure = this.figureObj.rotateRight(this.figure);
                await this.arena.rotate(this.figure);
            } else if (e.key === "ArrowRight") {
                this.arena.moveRight();
            } else if (e.key === "ArrowLeft") {
                this.arena.moveLeft();
            }
        });
    }

    async gameLoop() {
        while (this.running) {
            this.figure = this.figureObj.getRandomFigure();
            const figureColor = this.figureObj.getRandomColor();
            await this.arena.moveFigureUntilCollision(GameHandler.DEFAULT_COLUMN, this.figure, figureColor);
        }
    }
}