
export class Figure {

    figure;

    constructor(figureArray) {
        this.figure = figureArray;
    }

    rotateRight(array) {
        console.log("base")
        console.log(array)
        let rows = array.length;
        let cols = array[0].length;
        let rotated = Array.from({ length: rows }, () => new Array(cols).fill('.'));

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                rotated[col][rows - 1 - row] = array[row][col];
            }
        }
        console.log("result")
        console.log(rotated)
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