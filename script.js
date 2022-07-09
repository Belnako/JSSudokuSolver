document.addEventListener('DOMContentLoaded', () => {
    const boardDisplay = document.querySelector('.board');
    const solveButton = document.querySelector('.solve').addEventListener("click", solveStep);
    const stillSolvingSquares = document.querySelector('.stillSolving');

    /* Other Boards

    const board = [
        [4,9,6,0,0,0,8,0,2],
        [2,0,8,0,0,0,0,4,5],
        [0,5,3,2,4,8,0,9,6],
        [5,3,1,6,2,7,9,8,4],
        [8,0,0,0,0,4,6,0,0],
        [6,4,9,8,1,3,2,5,7],
        [0,8,5,7,0,0,4,2,9],
        [0,0,4,0,8,0,5,6,0],
        [9,6,0,4,0,0,0,0,8]
    ]

        const board = [
        [7,8,0,4,0,0,1,2,0],
        [6,0,0,0,7,5,0,0,9],
        [0,0,0,6,0,1,0,7,8],
        [0,0,7,0,4,0,2,6,0],
        [0,0,1,0,5,0,9,3,0],
        [9,0,4,0,6,0,0,0,5],
        [0,7,0,3,0,0,0,1,2],
        [1,2,0,0,0,7,4,0,0],
        [0,4,9,2,0,6,0,0,7]
    ]

        const board = [
        [5,0,0,0,0,0,0,1,3],
        [0,0,0,9,1,0,6,8,0],
        [1,0,0,0,0,0,0,0,0],
        [0,0,2,8,7,0,3,4,0],
        [0,0,0,0,0,0,0,7,0],
        [0,0,0,0,0,6,0,0,1],
        [0,5,8,1,3,0,4,0,0],
        [0,4,3,0,9,0,1,6,2],
        [0,0,1,0,0,4,0,3,0]
    ]

    */

    const board = [
        [7,8,0,4,0,0,1,2,0],
        [6,0,0,0,7,5,0,0,9],
        [0,0,0,6,0,1,0,7,8],
        [0,0,7,0,4,0,2,6,0],
        [0,0,1,0,5,0,9,3,0],
        [9,0,4,0,6,0,0,0,5],
        [0,7,0,3,0,0,0,1,2],
        [1,2,0,0,0,7,4,0,0],
        [0,4,9,2,0,6,0,0,7]
    ]

    let possibilities = [
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
    ]

    let possibleNumbers = [1,2,3,4,5,6,7,8,9];
    
    function createBoard(bo) {
        boardDisplay.innerHTML = '';
        for (p=0; p < bo.length; p++) {
            if (p % 3 === 0 && p != 0) {
                for (x=0; x < 11; x++) {
                    square = document.createElement('div')
                    square.innerHTML = '-'
                    boardDisplay.appendChild(square) 
                }
                
            }
            for (q=0; q < bo[0].length; q++) {
                if (q % 3 === 0 && q != 0) {
                    square = document.createElement('div')
                    square.innerHTML = '|'
                    boardDisplay.appendChild(square) 
                }
                
                square = document.createElement('div')
                square.innerHTML = bo[p][q]
                boardDisplay.appendChild(square)
            }
        }
    }

    function solveStep() {
        findPossibilities(board);
    }

    const findRemovablePossibilities = (bo, r, c) => {

        for (k=0; k < 9; k++) {
             // check Row
            if (possibleNumbers.findIndex((e) => e === bo[r][k]) > -1) {
                possibleNumbers.splice(possibleNumbers.findIndex((e) => e === bo[r][k]), 1);
            }
            // check Column
            if (possibleNumbers.findIndex((e) => e === bo[k][c]) > -1) {
                possibleNumbers.splice(possibleNumbers.findIndex((e) => e === bo[k][c]), 1);
            }
        }

        // check 3x3 square
        const squareLength = 3;
        const square = [Math.floor(r/squareLength), Math.floor(c/squareLength)];

        for (l=0; l < squareLength; l++) {
            for (m = 0; m < squareLength; m++) {
                if (possibleNumbers.findIndex((e) => e === bo[(square[0]*3)+l][(square[1]*3)+m]) > -1) {
                    possibleNumbers.splice(possibleNumbers.findIndex((e) => e === bo[(square[0]*3)+l][(square[1]*3)+m]), 1);
                }
            }
        }
        return possibleNumbers;
    }

    const findSinglePossibilities = (possibilities) => {
        let stillSolving = 0;
        for (n=0; n < possibilities.length; n++) {
            for (o = 0; o < possibilities.length; o++) {
                if(possibilities[n][o].length > 1) {
                    stillSolving++;
                }
                if(possibilities[n][o].length === 1) {
                    board[n][o] = possibilities[n][o][0];
                }
            }
        }
        stillSolvingSquares.innerHTML = `You still have ${stillSolving} Steps left`;
        if (stillSolving === 0 ) {
            stillSolvingSquares.innerHTML = 'Done!';
        }
        stillSolving = 0;
    }

    function findPossibilities(bo) {
        for (i=0; i < bo.length; i++) {
            for (j = 0; j < bo.length; j++) {
                if(bo[i][j] < 1) { 
                    possibilities[i][j] = findRemovablePossibilities(bo, i, j);
                    possibleNumbers = [1,2,3,4,5,6,7,8,9];
                }
            }
        }
        findSinglePossibilities(possibilities);
        createBoard(board);
    }

    createBoard(board);
})

