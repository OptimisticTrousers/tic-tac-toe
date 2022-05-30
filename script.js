const gameBoard = function(){

    const boardList = ["", "", "", "", "", "", "", "", ""];

    const points = document.querySelectorAll('div.box');

    const addElementToBoardList = (mark, index) => {

        boardList[index] = mark;
    }

    const getBoardList = () => {

        return boardList;
    }

    const getNodeList = () => {
        return points;
    }

    const getElementAtIndex = index => {
        return boardList[index];
    }

      function set (index, player) {
    if ((player !== 'x' && player !== 'o') || index < 0 || index > 8) return;
    if (boardList[index] !== '') return; //prevents overwriting of cells
    boardList[index] = player;
  }


    return {set, addElementToBoardList, getNodeList, getBoardList, getElementAtIndex};
}();

const displayController = function(){

    const render = () => {

        for(let i = 0; i < gameBoard.getBoardList().length; i++){

            const element = document.querySelector(`.box:nth-child(${i+1})`);

            element.innerText = gameBoard.getElementAtIndex(i);
        }
    }

    return {render};
}();


const game = function(){

      let player = 'x';
  let player1 = 'Player 1'; //player1 is x
  let player2 = 'Player 2'; //player2 is o

function getAllEmptyCellsIndexes(currBdSt) {
    return currBdSt.filter(i => i == "");
}

  function _testForWinner(optionalBoard) {
    let winner = 'none';
    let board;
    if (optionalBoard) {
      board = optionalBoard;
    } else {
      board = gameBoard.getBoardList();
    }

    const winLines = [
      [board[0],board[1],board[2]], [board[3],board[4],board[5]],
      [board[6],board[7],board[8]], [board[0],board[3],board[6]],
      [board[1],board[4],board[7]], [board[2],board[5],board[8]],
      [board[0],board[4],board[8]], [board[2],board[4],board[6]] 
    ];

    let isX = (currentValue) => currentValue === 'x';
    let isO = (currentValue) => currentValue === 'o';
    let isNotEmpty = (currentValue) => currentValue !== '';

    winLines.forEach(line => {
      if (line.every(isX) || line.every(isO)) {
        if (line.includes('x')) {
          winner = player1;
          return;
        } else {
          winner = player2;
          return;
        }
      }
    });

    if (winner === 'none' && board.every(isNotEmpty)) winner = 'tie';
    return winner;
  }

// Step 5 - Create a winner determiner function:
function checkIfWinnerFound(currBdSt, currMark) {
    if (
        (currBdSt[0] === currMark && currBdSt[1] === currMark && currBdSt[2] === currMark) ||
        (currBdSt[3] === currMark && currBdSt[4] === currMark && currBdSt[5] === currMark) ||
        (currBdSt[6] === currMark && currBdSt[7] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[0] === currMark && currBdSt[3] === currMark && currBdSt[6] === currMark) ||
        (currBdSt[1] === currMark && currBdSt[4] === currMark && currBdSt[7] === currMark) ||
        (currBdSt[2] === currMark && currBdSt[5] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[0] === currMark && currBdSt[4] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[2] === currMark && currBdSt[4] === currMark && currBdSt[6] === currMark)
) {
        return true;
    } else {
        return false;
    }
}

// Step 6 - Create the minimax algorithm:
function minimax(board, player) {
    //find available cells of each board that passes through the function
    let availableCells = _getAvailableCells(board);

    //attributes a higher score to favorable outcomes
    if(_testForWinner(board) === player1) {
      return {score: -10};
    } else if (_testForWinner(board) === player2) {
      return {score: 10};
    } else if (_testForWinner(board) === 'tie') {
      return {score: 0};
    }

    //apply the score to all available moves and save them
    let moves = [];

    availableCells.forEach( cell => {
      let move = {};
      move.index = cell;
      board[cell] = player;


      if (player === 'o') {
        let result = minimax(board, 'x');
        move.score = result.score;
      } else {
        let result = minimax(board, 'o');
        move.score = result.score;
      }
  
      board[cell] = '';
  
      moves.push(move);
    })

    //find most favorable score out of all saved moves
    let bestMove;
  
    if(player === 'o') {
      let bestScore = Number.NEGATIVE_INFINITY;
      moves.forEach( (move, indexOfBestScore) => {
        if (move.score > bestScore) {
          bestScore = move.score;
          bestMove = indexOfBestScore;
        }
      })
    } else {
      let bestScore = Number.POSITIVE_INFINITY;
      moves.forEach( (move, indexOfBestScore) => {
        if (move.score < bestScore) {
          bestScore = move.score;
          bestMove = indexOfBestScore;
        }
      })
    }
    //return the best move
    return moves[bestMove];
  }

  function _getAvailableCells(optionalBoard) {
    availableCells = [];

    if (optionalBoard) {
      optionalBoard.forEach( (cell, index) => {
        if(cell === '') availableCells.push(index);
      });
    } else {
      gameBoard.getBoardList().forEach( (cell, index) => {
        if(cell === '') availableCells.push(index);
      });
    }
        return availableCells;
  }

    const play = () => {

        randomComputerMove();




    }

    const randomComputerMove = () => {

        let randomPoint = parseInt(Math.random() * 8) + 1;

        gameBoard.addElementToBoardList("x", randomPoint);

        displayController.render();


    }

    return {play, minimax}
}();

game.play();



const Player = (name) => {

    let playerTurn = false;

    let aiMark = "";

    let humanMark = "";

    const getHumanMark = () => {

        return humanMark;
    }

    const getAiMark = () => {

        return aiMark;
    }

    const setHumanTurn = () => {

        return playerTurn;
    }

    const setMark = function(computer, human) {

        aiMark = computer;
        humanMark = human;
    }

    return {name, getAiMark, getHumanMark, setMark, setHumanTurn};
}


const Human = (name) => {

    const prototype = Player(name);

    const buttonX = document.querySelector('aside .marks button:nth-child(1)');

    const buttonO = document.querySelector('aside .marks button:nth-child(2)');

    const restartButton = document.querySelector('aside > button')

    restartButton.addEventListener('click', () => {

        location.reload();
    })

    buttonX.addEventListener('click', function() {

        prototype.setMark("O", "X");
        buttonO.classList.add('inactive');
    })

    buttonO.addEventListener('click', function() {

        prototype.setMark("X", "O");
        buttonX.classList.add('inactive');
    })

    const addMarks = () =>{

        gameBoard.getNodeList().forEach((point, index) => point.addEventListener('click', () => {

                gameBoard.addElementToBoardList("o", index);

                const bestPlayInfo = game.minimax(gameBoard.getBoardList(), "x");
                gameBoard.addElementToBoardList("x", bestPlayInfo.index);

                displayController.render();

        }))
    }

    return Object.assign({}, prototype, {addMarks});
}

const Computer = (name) => {

    const prototype = Player(name);

    return Object.assign({}, prototype);
}

const human = Human("Bob")

human.addMarks();