
export class Board {

    height = 20;
    width = 10;

    board = Array.from({ length: this.height }, () => new Array(this.width).fill('.'));

    placed = 'O';
    empty = '.';
    pending = 'X';
    
    placedPositions = [];

    constructor() {
        this.clearBoardSavePlaced();
    }
    clearBoardSavePlaced() {
        this.placedPositions = [];
        
        for (let row = 0; row <= this.board.length - 1; row++) {
            for (let column = 0; column <= this.board[row].length - 1; column++) {
                if (this.board[row][column] === this.pending) {
                    this.placedPositions.push({x: row, y: column});
                }
                if (this.board[row][column] !== this.placed) {
                    this.board[row][column] = this.empty;
                }
            }
        }
        return this.placedPositions;
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
                    detail: this.placedPositions,
                    bubbles: true,
                    composed: true,
                }))
                return;
            }
            this.insertFigureAtCoordinates(row, insertColumn, fieldStatus, figureArray);
            
            
            lastPlacedPositions = this.clearBoardSavePlaced();

            window.dispatchEvent(new CustomEvent('color-it', {
                detail: this.placedPositions,
                bubbles: true,
                composed: true,
            }))
            
        }
    }

    restoreLastPlacedPositions() {
        for (let position of this.placedPositions) {
            this.board[position.x][position.y] = this.placed;
        }
    }

    nextPlacementWillCollide(lastPositions) {
        for (let position of lastPositions) {
            const outOfBounds = position.x < this.board.length - 1 && position.y < this.board[position.x].length - 1;
            if (outOfBounds) {
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