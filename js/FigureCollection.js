
export class FigureCollection {

    static Horizontal = [
       ['.','.','.'],
       ['X','X','X'],
       ['.','.','.']
    ];

    static Vertical = [
        ['.','X','.'],
        ['.','X','.'],
        ['.','X','.']
    ];

    static Angle = [
        ['X','.'],
        ['X','X']
    ];

    
    static allFigures = [this.Horizontal,this.Vertical, this.Angle]
}