
export class Arena {

    height = 20;
    width = 10;

    board;

    placed = 'O';

    positionsOfPendingFigure = [];
    placedPositons = [];

    currentFigure = [];
    currentColumn = [];

    tickDuration = 200;


    constructor() {
        this.resetArena();
    }

    resetArena() {
        this.board = Array.from({ length: this.height }, () => new Array(this.width).fill('.'));
    }
    async moveFigureUntilCollision(insertColumn, arrayContainingFigure, color) {
        this.currentColumn = insertColumn;
        this.currentFigure = arrayContainingFigure;
        this.lastRowForFigure = (this.board.length - 1) - (this.currentFigure.length - 1);

        this.positionsOfPendingFigure = [];

        for (let row = 0; row < this.board.length; row++) {
            this.pushPendingFigure(row, color);

            if (this.nextMoveCollide(row)) {
                this.placePendingFigure();
                this.renderAllFigures();
                await this.sleep(this.tickDuration);
                break;
            }
            this.renderAllFigures();
            await this.sleep(this.tickDuration);
        }
    }

    async rotate(figure) {
        this.currentFigure = figure;
        await this.renderAllFigures();
    }

    moveRight() {
        const futureColumn = this.currentColumn + 1;
        const maxHorizontalIndexFromRight = (this.board[0].length - 1) - (this.currentFigure[0].length - 1);
        if (futureColumn <= maxHorizontalIndexFromRight) this.currentColumn++;
    }

    moveLeft() {
        const futureColumn = this.currentColumn - 1;
        const minHorizontalIndex = (this.currentFigure[0].length - 1);
        if (futureColumn >= minHorizontalIndex) this.currentColumn--;
    }

    renderAllFigures() {
        window.dispatchEvent(new CustomEvent('color-it', {
            detail: {pendingList: this.positionsOfPendingFigure, placedList: this.placedPositons},
            bubbles: true,
            composed: true,
        }));
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    placePendingFigure() {
        for (let position of this.positionsOfPendingFigure) {
            this.board[position.x][position.y] = this.placed;
            this.placedPositons.push({x: position.x, y:position.y, color: position.color})
        }
    }

    nextMoveCollide(row) {

        if (row === this.lastRowForFigure) return true;

        for (let position of this.positionsOfPendingFigure) {
            const outerBonds = position.x < 0 || position.y < 0
                || position.x > this.board.length - 1
                || position.y > this.board[position.x].length - 1;
            if (outerBonds) return true;
            const nextRowCollison = this.board[position.x + 1][position.y] === this.placed;
            if (nextRowCollison) return true;
        }
        return false;
    }
    pushPendingFigure(rowIndex, color) {
        this.positionsOfPendingFigure = [];

        for (let row = 0; row < this.currentFigure.length; row++) {
            for (let column = 0; column <= this.currentFigure[row].length - 1; column++) {
                if (this.currentFigure[row][column] === ".") continue;
                let nextRow = row + rowIndex;
                this.positionsOfPendingFigure.push({x: nextRow, y: column + this.currentColumn - 1, color: color})
            }
        }
    }
}