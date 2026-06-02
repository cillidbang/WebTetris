import {GameHandler} from "./GameHandler.js";

const startButton = document.querySelector('#startGameTrigger');
const gameContainer = document.querySelector('.game-container');

let sessionId = 0;

let currentGame;


startButton.addEventListener('click', () => {
    if (currentGame != null) {
        currentGame.stop();
        currentGame = null;
    }
    currentGame = new GameHandler(gameContainer, sessionId);
    sessionId++;
});
