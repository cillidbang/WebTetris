import {GameHandler} from "./GameHandler.js";

const startButton = document.querySelector('#startGameTrigger');


startButton.addEventListener('click', () => {
    new GameHandler();
});
