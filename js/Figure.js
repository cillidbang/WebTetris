
export class Figure {

    figure;

    constructor(figureArray) {
        this.figure = figureArray;
    }

    rotateRight(array) {
        let rows = array.length;
        let cols = array[0].length;
        let rotated = new Array(rows).fill(new Array(cols).fill('.'))

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
        let rotated = new Array(rows).fill(new Array(cols).fill('.'))

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                rotated[cols - 1 - col][row] = array[row][col];
            }
        }
        return rotated;
    }
}