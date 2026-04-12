

export class Board {

    height = 20;
    width = 10;

    board;

    placed = 'O';
    empty = '.';
    pending = 'X';

    pendingPositons = [];
    placedPositons = [];


    constructor() {
        this.board = Array.from({ length: this.height }, () => new Array(this.width).fill('.'));
    }
    clearBoardSavePlacedPositions(color) {
        this.pendingPositons = [];
        
        for (let row = 0; row <= this.board.length - 1; row++) {
            for (let column = 0; column <= this.board[row].length - 1; column++) {

                if (this.board[row][column] === this.pending) {
                    this.pendingPositons.push({x: row, y: column, color: color});
                }
                if (this.board[row][column] !== this.placed) {
                    this.board[row][column] = this.empty;
                }
            }
        }
    }

    async figureFallUntilCollision(insertColumn, figureArray, color) {
        window.addEventListener('rotate-figure', async e => {
            await this.sleep(100)
            figureArray = e.detail;
            await this.sleep(100);
            await this.displayPlacement();
        });
        window.addEventListener('move-right', async e => {
            if (insertColumn + 1 <= this.board[0].length - 1) insertColumn++;
        });
        window.addEventListener('move-left', async e => {
            if (insertColumn - 1 >= 0) insertColumn--;
        });
        
        const lastIndexForPlacement = (this.board.length - 1) - (figureArray.length - 1);

        for (let row = 0; row <= lastIndexForPlacement; row++) {
            const lastValidRow = row === lastIndexForPlacement;
            const fieldStatus = lastValidRow ? this.placed : this.pending;

            if (this.nextPlacementWillCollide()) {
                this.restoreLastPlacedPositions();
                await this.displayPlacement(color);
                break;
            }
            await this.insertFigureAtCoordinates(row, insertColumn, fieldStatus, figureArray, color);
            await this.displayPlacement(color);
        }
        return new Promise(resolve => resolve())
    }

    async displayPlacement(color) {
        window.dispatchEvent(new CustomEvent('color-it', {
            detail: {pendingList: this.pendingPositons, placedList: this.placedPositons},
            bubbles: true,
            composed: true,
        }));
        this.clearBoardSavePlacedPositions(color);
        await this.sleep(100)
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    restoreLastPlacedPositions() {
        for (let position of this.pendingPositons) {
            this.board[position.x][position.y] = this.placed;
            this.placedPositons.push({x: position.x, y:position.y, color: position.color})
        }
    }

    nextPlacementWillCollide() {
        for (let position of this.pendingPositons) {
            const innerBonds = position.x < this.board.length - 1 && position.x >= 0
                && position.y < this.board[position.x].length - 1 && position.y >= 0;
            if (innerBonds) {
                if (this.board[position.x + 1][position.y] === this.placed) {
                    return true;
                }
            }
        }
        return false;
    }
    insertFigureAtCoordinates(rowIndex ,insertColumn, fieldValue, figureArray, color) {
        this.pendingPositons = [];

        const isPlacement = fieldValue === this.placed;
        for (let row = 0; row <= figureArray.length - 1; row++) {
            for (let column = 0; column <= figureArray[row].length - 1; column++) {

            let nextRow = row + rowIndex;
                if (figureArray[row][column] !== this.empty) {
                    this.board[nextRow][column + insertColumn - 1] = fieldValue;
                    if (isPlacement) {
                        this.placedPositons.push({x: nextRow, y:column + insertColumn - 1, color: color});
                        continue;
                    }
                    this.pendingPositons.push({x: nextRow, y:column + insertColumn - 1, color: color})
                }
            }
        }
        return new Promise(resolve => setTimeout(resolve, 100));
    }


}