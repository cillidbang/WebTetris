import {Board} from "./board.js";
import {Renderer} from "./Renderer.js";
import {FigureCollection} from "./FigureCollection.js";

const boardGrid = document.querySelector('.board-grid');


const playboard = new Board();
const renderer = new Renderer(playboard.board)

renderer.setGridContent(boardGrid);

window.addEventListener('color-it', e => {
    renderer.displayPlacedCells(e.detail);
});


let count = 0;

window.addEventListener('next-figure', e => {
    if (count >= 5) return;
    playboard.figureFallUntilCollision(4, FigureCollection.Angle)
    count++;
});

async function sleep(ms) {
    await new Promise((resolve) => new Promise(() => setTimeout(resolve, ms)));
}

playboard.figureFallUntilCollision(4, FigureCollection.Angle)
