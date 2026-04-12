

export class Renderer {

    boardData;
    divMap = new Map();
    
    constructor(board) {
        this.boardData = board;
    }
    

    setGridContent(boardGrid) {
        for (let row = 0; row <= this.boardData.length - 1; row++) {
            for (let column = 0; column <= this.boardData[row].length - 1; column++) {
                const div = document.createElement('div');
                div.classList.add("grid-cell")
                div.dataset.row = `${row}`;
                div.dataset.column = `${column}`;
                const elem = boardGrid.appendChild(div);
                this.divMap.set(`${row}-${column}`, elem);
            }
        }
    }

    displayPlacedCells(positionLists) {
        for (const value of this.divMap.values()) {
            value.style.backgroundColor = "black";
        }
        for (const position of positionLists.pendingList) {
            const relatedElement = this.divMap.get(`${position.x}-${position.y}`);
            relatedElement.style.backgroundColor = position.color;
        }

        for (const position of positionLists.placedList) {
            const relatedElement = this.divMap.get(`${position.x}-${position.y}`);
            relatedElement.style.backgroundColor = position.color;
        }
    }

}