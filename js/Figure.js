
export class Figure {

    figure;
    figureArray;

    constructor(figureArray) {
        this.figureArray = figureArray;
        this.figure = this.getRandomFigure();
    }

    getRandomFigure() {
        let randomIndex = this.getRandomArbitrary(0, this.figureArray.length - 1);
        return this.figureArray[randomIndex];
    }

    getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

    rotateLeft(array) {
        let rows = array.length;
        let cols = array[0].length;
        let rotated = Array.from({ length: rows }, () => new Array(cols).fill('.'));

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                rotated[cols - 1 - col][row] = array[row][col];
            }
        }
        return rotated;
    }
}