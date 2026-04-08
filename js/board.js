
export class Board {

    height = 20;
    width = 10;

    board = Array.from({ length: this.height }, () => new Array(this.width).fill('.'));

    placed = 'O';
    empty = '.';
    pending = 'X';


    constructor() {
        this.clearBoardSavePlaced();
    }
    clearBoardSavePlaced() {
        const placedPositions = [];
        
        for (let row = 0; row <= this.board.length - 1; row++) {
            for (let column = 0; column <= this.board[row].length - 1; column++) {
                if (this.board[row][column] === this.pending) {
                    placedPositions.push({x: row, y: column});
                }
                if (this.board[row][column] !== this.placed) {
                    this.board[row][column] = this.empty;
                }
            }
        }
        return placedPositions;
    }

    async figureFallUntilCollision(insertColumn, figureArray) {
        const lastIndexForPlacement = (this.board.length - 1) - (figureArray.length - 1);
        let lastPlacedPositions = [];
        for (let row = 0; row <= lastIndexForPlacement; row++) {

            const isLastRow = row === lastIndexForPlacement;
            const fieldStatus = isLastRow ? this.placed : this.pending;

            if (this.nextPlacementWillCollide(lastPlacedPositions)) {
                this.restoreLastPlacedPositions(lastPlacedPositions);
                
                window.dispatchEvent(new CustomEvent('color-it', {
                    detail: lastPlacedPositions,
                    bubbles: true,
                    composed: true,
                }));
                return;
            }
            this.insertFigureAtCoordinates(row, insertColumn, fieldStatus, figureArray);
            window.dispatchEvent(new CustomEvent('color-it', {
                detail: lastPlacedPositions,
                bubbles: true,
                composed: true,
            }));
            lastPlacedPositions = this.clearBoardSavePlaced();
        }
    }

    restoreLastPlacedPositions(lastPlacedPositions) {
        for (let position of lastPlacedPositions) {
            this.board[position.x][position.y] = this.placed;
        }
    }

    nextPlacementWillCollide(lastPositions) {
        for (let position of lastPositions) {
            const innerBonds = position.x < this.board.length - 1 && position.y < this.board[position.x].length - 1;
            if (innerBonds) {
                if (this.board[position.x + 1][position.y] === this.placed) {
                    return true;
                }
            }
        }
        return false;
    }

    insertFigureAtCoordinates(rowIndex ,insertColumn,fieldValue,figureArray) {
        for (let row = 0; row <= figureArray.length - 1; row++) {
            for (let column = 0; column <= figureArray[row].length - 1; column++) {
            let nextRow = row + rowIndex;
                if (figureArray[row][column] !== this.empty) {
                    this.board[nextRow][column + insertColumn - 1] = fieldValue;
                }
            }
        }
    }


}