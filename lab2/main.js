
var currentState = ['','','','','','','','',''];
var scores = [0, 0];
var moveCounter = 0;

document.getElementsByClassName('display_player')[0].innerHTML = 'X';
document.getElementsByClassName('player_scores')[0].innerHTML = 'X: ' + scores[0] + ' O: ' + scores[1];

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
        var player = playerTurn();
        validMove(event, cellIndex, player);
        moveCounter += 1;
    }
    
    if (movesLeft() === 0) {
        alert('No more moves');
    } 

    if (player === 'X') {
        document.getElementsByClassName('display_player')[0].innerHTML = 'O';
    } else {
        document.getElementsByClassName('display_player')[0].innerHTML = 'X';
    }

    return;
}

function playerTurn () {
    var player = '';

    if (moveCounter % 2 === 0) {
        player = 'X';
    } else {
        player = 'O';
    }

    return player;
}

function validMove (currentEvent, index, player) {
    const cellId = currentEvent.target.id;
    currentState[index] = player;
    document.getElementById(cellId).getElementsByClassName('xo')[0].innerHTML = player;

    return;
}

function movesLeft () {
    const movesLeft = currentState.length - currentState.filter(String).length;

    return movesLeft;
}

function gameFinished () {
    currentState = ['','','','','','','','',''];
    document.querySelectorAll('.cell').forEach(cell => cell.getElementsByClassName('xo')[0].innerHTML = '');
    document.getElementsByClassName('display_player')[0].innerHTML = 'X';
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
document.getElementById('new_game').addEventListener('click', gameFinished);