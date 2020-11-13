document.addEventListener('DOMContentLoaded', () => {
    const boardDisplay = document.querySelector('.board')

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
    
    function createBoard(bo) {
        for (i=0; i < bo.length; i++) {
            if (i % 3 === 0 && i != 0) {
                for (x=0; x < 11; x++) {
                    square = document.createElement('div')
                    square.innerHTML = '-'
                    boardDisplay.appendChild(square) 
                }
                
            }
            for (j=0; j < bo[0].length; j++) {
                if (j % 3 === 0 && j != 0) {
                    square = document.createElement('div')
                    square.innerHTML = '|'
                    boardDisplay.appendChild(square) 
                }
                
                square = document.createElement('div')
                square.innerHTML = bo[i][j]
                boardDisplay.appendChild(square)
            }
        }
    }

    createBoard(board);

    function solve(bo) {
        
    }

    function findEmptySquare(bo) {
        for (i=0; i < bo.length; i++) {
            for (j=0; j < bo[0].length; j++) {
                if (bo[i][j] === 0) {
                    return (i,j)  // Returns Row (i) and Col (j) of Empty Square
                }
            }
        }
    }

    function valid(bo, num, pos) {

        // check Row
        for (i=0; i < bo[0].length; i++) {
            if (bo[pos[0]][i] === num && pos[1] != i) {
                return false
            }
        }

        // check Column
        for (i=0; i < bo.length; i++)  {
            if (bo[i][pos[1]] === num && pos[0] != i) {
                return false
            }
        }

        // check 3x3 square
        let boxX = pos[1] >> 3
        let boxY = pos[0] >> 3

        for (i = 0; i < boxY*3 + 3; i ++) {
            for (j = 0; j < boxX*3 + 3; j++) {
                if (bo[i][j] === num && (i,j) != pos) {
                    return false
                }
            }
        }

        return true

    }

    
})

