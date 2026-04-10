
import {Renderer} from "./Renderer.js";
import {FigureCollection} from "./FigureCollection.js";

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
        this.clearBoardSavePlacedPositions();
    }
    clearBoardSavePlacedPositions() {
        this.pendingPositons = [];
        
        for (let row = 0; row <= this.board.length - 1; row++) {
            for (let column = 0; column <= this.board[row].length - 1; column++) {

                if (this.board[row][column] === this.pending) {
                    this.pendingPositons.push({x: row, y: column});
                }
                if (this.board[row][column] !== this.placed) {
                    this.board[row][column] = this.empty;
                }
            }
        }
    }

    async figureFallUntilCollision(insertColumn, figureArray) {
        const lastIndexForPlacement = (this.board.length - 1) - (figureArray.length - 1);

        for (let row = 0; row <= lastIndexForPlacement; row++) {

            const isLastRow = row === lastIndexForPlacement;
            const fieldStatus = isLastRow ? this.placed : this.pending;

            if (this.nextPlacementWillCollide()) {
                this.restoreLastPlacedPositions();
                return;
            }
            this.insertFigureAtCoordinates(row, insertColumn, fieldStatus, figureArray);
            window.dispatchEvent(new CustomEvent('color-it', {
                detail: {pendingList: this.pendingPositons, placedList: this.placedPositons},
                bubbles: true,
                composed: true,
            }));
            await this.sleep(300);
            this.clearBoardSavePlacedPositions();
        }
    }

    async sleep(ms) {
        await new Promise((resolve) => new Promise(() => setTimeout(resolve, ms)));
    }

    restoreLastPlacedPositions() {
        this.placedPositons = [];
        for (let position of this.pendingPositons) {
            this.board[position.x][position.y] = this.placed;
            this.placedPositons.push({x: position.x, y:position.y})
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
    insertFigureAtCoordinates(rowIndex ,insertColumn, fieldValue, figureArray) {
        this.pendingPositons = [];
        this.placedPositons = [];

        for (let row = 0; row <= figureArray.length - 1; row++) {
            for (let column = 0; column <= figureArray[row].length - 1; column++) {

            let nextRow = row + rowIndex;
                if (figureArray[row][column] !== this.empty) {
                    this.board[nextRow][column + insertColumn - 1] = fieldValue;
                    if (fieldValue === this.placed) {
                        this.placedPositons.push({x: nextRow, y:column + insertColumn - 1});
                        window.dispatchEvent(new CustomEvent('next-figure', {
                            bubbles: true,
                            composed: true,
                        }));
                    }
                    this.pendingPositons.push({x: nextRow, y:column + insertColumn - 1})
                }
            }
        }
    }


}