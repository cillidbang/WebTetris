import {Board} from "./board.js";
import {Renderer} from "./Renderer.js";
import {FigureCollection} from "./FigureCollection.js";

const boardGrid = document.querySelector('.board-grid');


const playboard = new Board();
const renderer = new Renderer(playboard.board);

renderer.setGridContent(boardGrid);

window.addEventListener('color-it', e => {
    renderer.displayPlacedCells(e.detail); 
})

playboard.figureFallUntilCollision(4, FigureCollection.Angle)
