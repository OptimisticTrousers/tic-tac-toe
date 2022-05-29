const gameBoard = function(){

    let boardList = ['', '', '', '', '', '', '', ''];

    const points = document.querySelectorAll('div.box');

    function addElementToList(mark, index){

        boardList[index] = mark;
    }

    function getNodeList(){
        return points;
    }

    function getBoardListElement(index){
        return boardList[index];
    }

    return {addElementToList, getNodeList, getBoardListElement};
}();

const displayController = function() {

    const render = function(){

        gameBoard.getNodeList().forEach((point,index) => point.addEventListener('click', (event) => {

            console.log(gameBoard.getBoardListElement(index));

            event.target.innerText = gameBoard.getBoardListElement(index);
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

    function setMark(value){
        mark = value;
    }

    buttonX.addEventListener('click', setMark("X"))

    buttonO.addEventListener('click', setMark("O"))

    function addMarks(){

        gameBoard.getNodeList().forEach((point, index) => point.addEventListener('click', () => {

            console.log(mark);
            gameBoard.addElementToList(mark, index);
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
