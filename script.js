const gameBoard = function(){

    let boardList = ['', '', '', '', '', '', '', '', ''];

    const points = document.querySelectorAll('div.box');

    const addElementToBoardList = (mark, index) => {

        boardList[index] = mark;
    }

    const getList = () => {
        return points;
    }

    const getElementAtIndex = index => {
        return boardList[index];
    }

    return {addElementToBoardList, getList, getElementAtIndex};
}();


const displayController = function(){

    const render = () => {

        gameBoard.getList().forEach((point,index) => point.addEventListener('click', (event) => {

            event.target.innerText = gameBoard.getElementAtIndex(index);
        }))
    }

    return {render};
}();

const Player = (name) => {

    return {name};
}

const Human = (name) => {

    const humanName = Player(name);

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


    buttonX.addEventListener('click', () => setMark("X"));

    buttonO.addEventListener('click', () => setMark("O"));

    const addMarks = () =>{

        gameBoard.getList().forEach((point, index) => point.addEventListener('click', () => {

            if(gameBoard.getElementAtIndex(index) == ""){

                gameBoard.addElementToBoardList(mark, index);
            }
        }))
    }

    return {addMarks}
}

const Computer = () => {

    const {name} = Player("Computer");
}

const human = Human('Bob');

const computer = Computer();

human.addMarks();

displayController.render();
