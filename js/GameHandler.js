import {Board} from "./board.js";
import {Renderer} from "./Renderer.js";
import {FigureCollection} from "./FigureCollection.js";
import {Figure} from "./Figure.js";

export class GameHandler {


    constructor() {
        this.boardGrid = document.querySelector('.board-grid');

        this.playboard = new Board();
        this.renderer = new Renderer(this.playboard.board)
        this.figureObj = new Figure(FigureCollection.allFigures)
        this.figure = this.figureObj.figure;
        this.insertColumn = 4;

        this.renderer.setGridContent(this.boardGrid);
        this.addControlListeners();
        this.addRenderEventListener();
        this.gameLoop();
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
        for (let i = 0; i <= 10; i++) {
            this.figure = this.figureObj.getRandomFigure();
            const color = this.getRandomColor();
            await this.playboard.figureFallUntilCollision(this.insertColumn, this.figure, color);
        }
    }

    getRandomColor() {
        const colors = ['red', 'blue', 'green', 'purple'];
        let cIndex = this.getRandomArbitrary(0, colors.length - 1)
        return colors[cIndex];
    }

    getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}