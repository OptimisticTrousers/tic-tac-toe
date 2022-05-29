const gameBoard = function(){

    let boardList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

    const getAllEmptyCellsIndexes = (boardList) =>{

        return boardList.filter(i => i != "X" && o != "o");
    }

    return {addElementToBoardList, getNodeList, getBoardList, getElementAtIndex, getAllEmptyCellsIndexes};
}();


const displayController = function(){

    const render = () => {

        gameBoard.getNodeList().forEach((point,index) => point.addEventListener('click', (event) => {

            if(Number.isInteger(gameBoard.getElementAtIndex(index)) != true){

                event.target.innerText = gameBoard.getElementAtIndex(index);
            }
        }))
    }

    return {render};
}();

const Player = (name) => {

    let playerTurn = true;

    let aiMark = "";

    let humanMark = "";

    const setPlayerTurn = (turn) => {
        playerTurn = turn;
    }
    const getPlayerTurn = () =>{
        return playerTurn;
    }

    const getHumanMark = () => {

        return humanMark;
    }

    const getAiMark = () => {

        return aiMark;
    }

    const setMark = function(aiMark, humanMark) {

        this.aiMark = aiMark;
        this.humanMark = humanMark;
    }


    return {name, setPlayerTurn, getPlayerTurn, getAiMark, getHumanMark, setMark};
}


const Human = (name) => {

    const prototype = Player(name);

    const buttonX = document.querySelector('aside .marks button:nth-child(1)');

    const buttonO = document.querySelector('aside .marks button:nth-child(2)');

    const restartButton = document.querySelector('aside > button')

    let mark = "";

    restartButton.addEventListener('click', () => {

        location.reload();
    })

    const setMark = value =>{
        mark = value;
    }

    buttonX.addEventListener('click', function() {

        setMark("X");
        buttonO.classList.add('inactive');
    })
    buttonO.addEventListener('click', function() {

        setMark("O");
        buttonX.classList.add('inactive');
    })

    const addMarks = () =>{

        gameBoard.getNodeList().forEach((point, index) => point.addEventListener('click', () => {

            if(Number.isInteger(gameBoard.getElementAtIndex(index)) == true && prototype.getPlayerTurn() == true){

                gameBoard.addElementToBoardList(mark, index);

                prototype.setPlayerTurn(false)
            }
        }))
    }

    return Object.assign({}, prototype, {addMarks});
}

const Computer = (name) => {

    const prototype = Player(name);

    const boardList = gameBoard.getBoardList();

    const minimax = (currBdSt, currMark) => {

    }

    return Object.assign({}, prototype, {minimax});
}

const game = function(){

    let score = 0;

    const checkIfWinnerFound = (currBdSt, currMark) => {

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


    const human = Human('Bob');

    const computer = Computer("Computer");

    human.setMark("bob", "jones")

    const bestPlayInfo = computer.minimax(gameBoard.getBoardList(), computer.getPlayerTurn());

    const play = () => {
        
        human.addMarks();

        displayController.render();

    }

    return {play}
}();

game.play();





