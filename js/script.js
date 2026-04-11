import {Board} from "./board.js";
import {Renderer} from "./Renderer.js";
import {FigureCollection} from "./FigureCollection.js";
import {Figure} from "./Figure.js";

const boardGrid = document.querySelector('.board-grid');


const playboard = new Board();
const renderer = new Renderer(playboard.board)

renderer.setGridContent(boardGrid);
let figureObj = new Figure(FigureCollection.Angle);
let figure = figureObj.figure;
let insertColumn = 4;

gameLoop();

window.addEventListener('color-it', e => {
    renderer.displayPlacedCells(e.detail);
});

window.addEventListener('keyup', e => {
    figure = figureObj.rotateRight(figure);
});

async function gameLoop() {

    for (let i = 0; i <= 9; i++) {
        console.log(figure)
        await playboard.figureFallUntilCollision(insertColumn, figure);
        console.log(i)
    }

}
