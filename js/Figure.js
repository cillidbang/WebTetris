import {FigureCollection} from "./FigureCollection.js";

export class Figure {

    figure;
    figureCollection = FigureCollection.allFigures;

    constructor() {
        this.figure = this.getRandomFigure();
    }

    getRandomFigure() {
        let randomIndex = this.getRandomNumber(0, this.figureCollection.length - 1);
        return this.figureCollection[randomIndex];
    }

    rotateRight(array) {
        let rows = array.length;
        let cols = array[0].length;
        let rotated = Array.from({ length: rows }, () => new Array(cols).fill('.'));

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                rotated[col][rows - 1 - row] = array[row][col];
            }
        }
        return rotated;
    }

    getRandomColor() {
        const colors = ['red', 'blue', 'green', 'purple'];
        let cIndex = this.getRandomNumber(0, colors.length - 1)
        return colors[cIndex];
    }
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    getFigure() {
        return this.figure;
    }
}