const gameBoard = (function () {
  const boardList = ["", "", "", "", "", "", "", "", ""];

  const points = document.querySelectorAll("div.box");

  const addElementToBoardList = (mark, index) => {
    boardList[index] = mark;
  };

  const getBoardList = () => {
    return boardList;
  };

  const getNodeList = () => {
    return points;
  };

  const getElementAtIndex = (index) => {
    return boardList[index];
  };

  return {
    addElementToBoardList,
    getNodeList,
    getBoardList,
    getElementAtIndex,
  };
})();

const displayController = (function () {
  const render = () => {
    for (let i = 0; i < gameBoard.getBoardList().length; i++) {
      const element = document.querySelector(`.box:nth-child(${i + 1})`);
      const character = gameBoard.getElementAtIndex(i);
      if (character === "o") {
        element.classList.add("box-blue");
      }
      element.innerText = character;
    }
  };

  return { render };
})();

const Player = (name) => {
  let aiMark = "";

  let humanMark = "";

  const getHumanMark = () => {
    return humanMark;
  };

  const getAiMark = () => {
    return aiMark;
  };

  const setMark = function (computer, human) {
    aiMark = computer;
    humanMark = human;
  };

  return { name, getAiMark, getHumanMark, setMark };
};

const game = (function () {
  let player1 = "";

  let player2 = "";

  function _testForWinner(optionalBoard) {
    let winner = "none";

    let board;

    if (optionalBoard) {
      board = optionalBoard;
    } else {
      board = gameBoard.getBoardList();
    }

    const winLines = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    let isX = (currentValue) => currentValue === "x";

    let isO = (currentValue) => currentValue === "o";

    let isNotEmpty = (currentValue) => currentValue !== "";

    winLines.forEach((line) => {
      if (line.every(isX) || line.every(isO)) {
        if (line.includes("x")) {
          winner = player1;
          return;
        } else {
          winner = player2;
          return;
        }
      }
    });

    if (winner === "none" && board.every(isNotEmpty)) winner = "tie";
    return winner;
  }

  // Step 5 - Create a winner determiner function:
  function checkIfWinnerFound(currBdSt, currMark) {
    if (
      (currBdSt[0] === currMark &&
        currBdSt[1] === currMark &&
        currBdSt[2] === currMark) ||
      (currBdSt[3] === currMark &&
        currBdSt[4] === currMark &&
        currBdSt[5] === currMark) ||
      (currBdSt[6] === currMark &&
        currBdSt[7] === currMark &&
        currBdSt[8] === currMark) ||
      (currBdSt[0] === currMark &&
        currBdSt[3] === currMark &&
        currBdSt[6] === currMark) ||
      (currBdSt[1] === currMark &&
        currBdSt[4] === currMark &&
        currBdSt[7] === currMark) ||
      (currBdSt[2] === currMark &&
        currBdSt[5] === currMark &&
        currBdSt[8] === currMark) ||
      (currBdSt[0] === currMark &&
        currBdSt[4] === currMark &&
        currBdSt[8] === currMark) ||
      (currBdSt[2] === currMark &&
        currBdSt[4] === currMark &&
        currBdSt[6] === currMark)
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
    if (_testForWinner(board) === player1) {
      return { score: -10 };
    } else if (_testForWinner(board) === player2) {
      return { score: 10 };
    } else if (_testForWinner(board) === "tie") {
      return { score: 0 };
    }

    //apply the score to all available moves and save them
    let moves = [];

    availableCells.forEach((cell) => {
      let move = {};

      move.index = cell;

      board[cell] = player;

      if (player === "o") {
        let result = minimax(board, "x");
        move.score = result.score;
      } else {
        let result = minimax(board, "o");
        move.score = result.score;
      }

      board[cell] = "";

      moves.push(move);
    });

    //find most favorable score out of all saved moves
    let bestMove;

    if (player === "o") {
      let bestScore = Number.NEGATIVE_INFINITY;
      moves.forEach((move, indexOfBestScore) => {
        if (move.score > bestScore) {
          bestScore = move.score;
          bestMove = indexOfBestScore;
        }
      });
    } else {
      let bestScore = Number.POSITIVE_INFINITY;
      moves.forEach((move, indexOfBestScore) => {
        if (move.score < bestScore) {
          bestScore = move.score;
          bestMove = indexOfBestScore;
        }
      });
    }
    //return the best move
    return moves[bestMove];
  }

  function _getAvailableCells(optionalBoard) {
    availableCells = [];

    if (optionalBoard) {
      optionalBoard.forEach((cell, index) => {
        if (cell === "") availableCells.push(index);
      });
    } else {
      gameBoard.getBoardList().forEach((cell, index) => {
        if (cell === "") availableCells.push(index);
      });
    }
    return availableCells;
  }

  const randomComputerMove = () => {
    let randomPoint = parseInt(Math.random() * 8) + 1;

    gameBoard.addElementToBoardList("x", randomPoint);

    displayController.render();
  };

  function play(player) {
    if (player.getAiMark() == "x") {
      randomComputerMove();
      player1 = "Player 1"; //player1 is x
      player2 = "Player 2"; //player2 is o
    } else {
      player2 = "Player 1";
      player1 = "Player 2";
    }
  }

  return { play, minimax, checkIfWinnerFound, randomComputerMove };
})();

const Human = (name) => {
  const prototype = Player(name);

  const buttonX = document.querySelector("button.button.button-x");

  const buttonO = document.querySelector("button.button.button-o");

  const restartButton = document.querySelector(".restart");

  let gameOver = false;

  let computerIsPlaying = false;

  restartButton.addEventListener("click", () => {
    location.reload();
  });

  function eventListener() {
    addMarks();

    game.play(prototype);
  }

  buttonX.addEventListener("click", function () {
    const feedback = document.querySelector(".feedback");
    const controls = document.querySelector(".controls");
    const playerMark = document.querySelector(".character-player");
    const computerMark = document.querySelector(".character-computer");
    playerMark.textContent = "X";
    computerMark.textContent = "O";
    feedback.textContent = "You picked X!";

    controls.classList.add("inactive");
    // this.classList.add("inactive");

    // buttonO.classList.add("inactive");

    eventListener();

    prototype.setMark("o", "x");
  });

  buttonO.addEventListener("click", function () {
    const feedback = document.querySelector(".feedback");
    const controls = document.querySelector(".controls");
    const playerMark = document.querySelector(".character-player");
    const computerMark = document.querySelector(".character-computer");
    playerMark.textContent = "O";
    computerMark.textContent = "X";

    controls.classList.add("inactive");
    feedback.textContent = "You picked O!";

    eventListener();

    game.randomComputerMove();

    prototype.setMark("x", "o");
  });

  const addMarks = () => {
    gameBoard.getNodeList().forEach((point, index) =>
      point.addEventListener("click", () => {
        const results = document.querySelector(".feedback");

        if (
          gameBoard.getElementAtIndex(index) === "" &&
          gameOver == false &&
          computerIsPlaying == false
        ) {
          gameBoard.addElementToBoardList(prototype.getHumanMark(), index);

          displayController.render();

          const bestPlayInfo = game.minimax(
            gameBoard.getBoardList(),
            prototype.getAiMark()
          );

          gameBoard.addElementToBoardList(
            prototype.getAiMark(),
            bestPlayInfo.index
          );

          displayController.render();
        }

        if (
          game.checkIfWinnerFound(
            gameBoard.getBoardList(),
            prototype.getHumanMark()
          )
        ) {
          results.textContent = "YOU WIN! Restart to play again!";
          gameOver = true;
        } else if (
          game.checkIfWinnerFound(
            gameBoard.getBoardList(),
            prototype.getAiMark()
          )
        ) {
          results.textContent = "YOU LOSE! Restart to play again!";
          gameOver = true;
        } else if (gameBoard.getBoardList().includes("") === false) {
          results.textContent = "TIE! Restart to play again!";
          gameOver = true;
        }
      })
    );
  };

  return Object.assign({}, prototype, { addMarks });
};

const Computer = (name) => {
  const prototype = Player(name);

  return Object.assign({}, prototype);
};

const human = Human("Bob");
