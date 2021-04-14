
var currentState = ['','','','','','','','',''];

var player1 = 'X';
var player2 = 'O';
var moveCounter = 0;

const winningMoves = [[1, 2, 3],
                      [1, 4, 7],
                      [1, 5, 9],
                      [4, 5, 6],
                      [7, 8, 9],
                      [2, 5, 8],
                      [3, 6, 9],
                      [3, 5, 7]
                    ];


function cellClicked (event) {
    // Get the index of the cell [1, ... , 9], subtract one for array indexing
    const cellIndex = parseInt( event.target.id ) - 1;

    // Check if the current id is set
    if (currentState[cellIndex] !== '') {
        alert('Space taken, choose a new one.');
    } else {
        validMove(event, cellIndex);
    }
    
    if (movesLeft() === 0) {
        gameFinished();
    } 

    moveCounter += 1;

    return;
}

function validMove (currentEvent, index) {
    const cellId = currentEvent.target.id;

    if (moveCounter % 2 === 0) {
        currentState[index] = player1;
        document.getElementById(cellId).getElementsByClassName('xo')[0].innerHTML = player1;
    } else {
        currentState[index] = player2;
        document.getElementById(cellId).getElementsByClassName('xo')[0].innerHTML = player2;
    }

    return;
}

function movesLeft () {
    const movesLeft = currentState.length - currentState.filter(String).length;

    return movesLeft;
}

function gameFinished () {
    currentState = ['','','','','','','','',''];
    document.querySelectorAll('.cell').forEach(cell => cell.getElementsByClassName('xo')[0].innerHTML = '');
    moveCounter = 0;
}

function mouseOver (event) {
    document.getElementById(event.target.id).style.backgroundColor = 'green';
}

function mouseOut (event) {
    document.getElementById(event.target.id).style.backgroundColor = 'pink';
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClicked));
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('mouseover', mouseOver));
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('mouseout', mouseOut));