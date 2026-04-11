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

gameLoop();

async function gameLoop() {

    for (let i = 0; i <= 9; i++) {
        await playboard.figureFallUntilCollision(4, FigureCollection.Angle);
        console.log(i)
    }

}
