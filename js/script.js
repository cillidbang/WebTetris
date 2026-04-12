import {Board} from "./board.js";
import {Renderer} from "./Renderer.js";
import {FigureCollection} from "./FigureCollection.js";
import {Figure} from "./Figure.js";

const boardGrid = document.querySelector('.board-grid');
const startButton = document.querySelector('#startGameTrigger');


const playboard = new Board();
const renderer = new Renderer(playboard.board)

let figureObj = new Figure(FigureCollection.allFigures);
let figure = figureObj.figure;
let insertColumn = 4;
    
startButton.addEventListener('click', () => {
    renderer.setGridContent(boardGrid);
    gameLoop();
});

window.addEventListener('color-it', e => {
    renderer.displayPlacedCells(e.detail);
});

window.addEventListener('keydown', async e => {
    
    if (e.key === "ArrowUp") {
        figure = figureObj.rotateRight(figure);
        dispatchEvent(new CustomEvent("rotate-figure", {detail: figure, bubbles: true, composed: true}));
    }
    else if (e.key === "ArrowRight") {
        dispatchEvent(new CustomEvent("move-right", {bubbles: true, composed: true}));
    }
    else if (e.key === "ArrowLeft") {
        dispatchEvent(new CustomEvent("move-left", {bubbles: true, composed: true}));
    }
    
});
async function gameLoop() {
    for (let i = 0; i <= 10; i++) {
        figure = figureObj.getRandomFigure();
        const color = getRandomColor();
        await playboard.figureFallUntilCollision(insertColumn, figure, color);
    }
}

function getRandomColor() {
    const colors = ['red', 'blue', 'green'];
    let cIndex = getRandomArbitrary(0, colors.length - 1)
    return colors[cIndex];
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
