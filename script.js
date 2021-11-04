document.addEventListener('DOMContentLoaded', () => {
    const boardDisplay = document.querySelector('.board')
    let row = 0
    let col = 0

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
        if (solved(bo)) {
            return bo
        } else {
            const possibilities = nextBoards(bo)
            const validBoards = keepOnlyValid(possibilities)
            return searchForSolution(validBoards)
        }
    }

    function searchForSolution(bo) {
        if (board.length < 1) {
            return false
        } else {
            var first = board.shift()
            const tryPath = solve(first)
            if (tryPath != false) {
                return tryPath
            } else {
                return searchForSolution(boards)
            }
        }
    }

    function solved(bo) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                console.log(bo);
                if (bo[i][j] === 0) {
                    return false
                }
            }
        }
        return true
    }

    function nextBoards(bo) {
        let res = []
        const firstEmpty = findEmptySquare(bo) // (y,x)
        if (firstEmpty != undefined) {
            const y = firstEmpty[0]
            const x = firstEmpty[1]
            for (let i = 1; i <= 9; i++) {
                let newBoard = [...board]
                var row = [...newBoard[y]]
                row[x] = i
                newBoard[y] = row
                res.push(newBoard)
            }
        }
        return res
    }

    function findEmptySquare(bo) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (bo[i][j] === 0) {
                    return [i, j]
                }
            }
        }
    }

    function keepOnlyValid(bo) {
        return board.filter((b) => validBoards(b))
    }

    function validBoards(bo) {
        return rowGood(bo) && columnGood(bo) && boxGood(bo)
    }

    function rowGood(bo) {
        for (let i = 0; i < 9; i++) {
            let cur = []
            for (let j = 0; j < 9; j++) {
                if (cur.includes(bo[i][j])) {
                    return false
                } else if (bo[i][j] != null) {
                    cur.push(bo[i][j])
                }
            }
        }
        return true
    }

    function columnGood(bo) {
        for (let i = 0; i < 9; i++) {
            let cur = []
            for (let j = 0; j < 9; j++) {
                if (cur.includes(bo[j][i])) {
                    return false
                } else if (bo[j][i] != null) {
                    cur.push(bo[j][i])
                }
            }
        }
        return true
    }

    function boxGood(bo) {
            // transform this everywhere to update res
        const boxCoordinates =  [[0, 0], [0, 1], [0, 2],
                                [1, 0], [1, 1], [1, 2],
                                [2, 0], [2, 1], [2, 2]]
        // THIS FUNCTION WORKS.
        // Board -> Boolean
        // makes sure there are no repeating numbers for each box
        for (var y = 0; y < 9; y += 3) {
            for (var x = 0; x < 9; x += 3) {
                // each traversal should examine each box
                var cur = []
                for (var i = 0; i < 9; i++) {
                    var coordinates = [...boxCoordinates[i]]
                    coordinates[0] += y
                    coordinates[1] += x
                    if (cur.includes(board[coordinates[0]][coordinates[1]])) {
                        return false
                        } else if (board[coordinates[0]][coordinates[1]] != null) {
                            cur.push(board[coordinates[0]][coordinates[1]])
                        }
                    }
                }
            }
        return true
        
    }

    console.log(solve(board));

    /*function solve(bo) {
        let find = findEmptySquare(bo)

        if (!find) {
            createBoard(board)
            return true // solved
        } else {
            console.log(row, col)
            //row, col = find;
        }

        for (n = 1; n < 10; n++) {

            if (valid(bo, n, row, col)) {
                console.log(n)
                bo[row][col] = n;
                if (solve(bo)) {
                    return true;
                }
            } else {
                bo[row][col] = 0;
            }
        }
        return false;
    }

    function findEmptySquare(bo) {
        for (i=0; i < bo.length; i++) {
            for (j=0; j < bo[0].length; j++) {
                if (bo[i][j] === 0) {
                    row = Number(i)
                    col = Number(j)
                    return true
                }
            }
        }
        return false
    }

    function valid(bo, num, r, c) {

        // check Row
        for (i=0; i < bo[0].length; i++) {
            if (bo[r][i] === num && c != i) {
                return false
            }
        }

        // check Column
        for (i=0; i < bo.length; i++)  {
            if (bo[i][c] === num && r != i) {
                return false
            }
        }

        // check 3x3 square
        let boxX = c >> 3
        let boxY = r >> 3

        for (i = 0; i < boxY*3 + 3; i ++) {
            for (j = 0; j < boxX*3 + 3; j++) {
                if (bo[i][j] === num && i != r && j != c) {
                    return false
                }
            }
        }

        return true

    }*/

    //solve(board);
    
})

