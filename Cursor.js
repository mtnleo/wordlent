export class Cursor {

    // CONSTRUCTOR ---------------------------------

    constructor() {
        this.row = 1;
        this.column = 0;
        this.word = new Array();
    }

    // GETTERS AND SETTERS ---------------------------------

    getRow() {
        return this.row;
    }

    getColumn() {
        return this.column;
    }

    setColumn(position) {
        this.column = position;
    }

    getWord() {
        return this.word;
    }

    // METHODS ---------------------------------------

    increaseRow() {
        this.row++;
    }

    increaseColumn() {
        if (this.column < 5) {
            this.column++;
        } 
    }

    decreaseRow() {
        if (this.row > 0) {
            this.row--;
        }
    }

    decreaseColumn() {
        if (this.column > 0) {
            this.column--;
        }
    }

    addLetter(newLetter) {
        if (this.word.length < 5) {
        this.word.push(newLetter);
        }
        
    }
    
    removeLetter() {
        if (this.word.length > 0) {
            this.word.pop();
        }
        
    }

    deleteWord() {
        this.word = new Array();
    }
}
